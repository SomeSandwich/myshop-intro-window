using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using API.Types.Objects.Filter;
using Api.Types.Objects.Order;
using API.Types.Objects.Statistic;
using Api.Types.Results;
using AutoMapper;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IOrderService
{
    Task<PagedResponse<OrderRes>> GetAsync(OrderPagingFilter filter);
    Task<OrderRes?> GetAsync(int id);

    Task<int> CreateAsync(int sellerId, CreateOrderReq req);

    Task<BaseResult> UpdateAsync(int id, UpdateOrderReq req);

    Task<BaseResult> DeleteAsync(int id);

    Task<StatByCateRes> GetStatisticByCate(StatByCateQuery query);
    Task<StatByYearRes> GetStatisticByYear(StatByYearQuery query);
}

public class OrderService : IOrderService
{
    private readonly IUriService _uriService;
    private readonly IOrderDetailService _orderDetailService;
    private readonly MyShopDbContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public OrderService(MyShopDbContext context, IMapper mapper, IUriService uriService,
        IOrderDetailService orderDetailService, IHttpContextAccessor httpContextAccessor)
    {
        _uriService = uriService;
        _orderDetailService = orderDetailService;
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedResponse<OrderRes>> GetAsync(OrderPagingFilter filter)
    {
        var lsOrder = _context.Orders
            .OrderByDescending(e => e.CreateAt)
            .Include(e => e.OrderDetails)
            .Include(e => e.Customer)
            .AsEnumerable();

        if (filter.CustomerId is not null)
            lsOrder = lsOrder.Where(e => e.CustomerId == filter.CustomerId);

        if (filter.DateFrom is not null)
            lsOrder = lsOrder.Where(e => DateOnly.FromDateTime(e.CreateAt) >= filter.DateFrom);

        if (filter.DateTo is not null)
            lsOrder = lsOrder.Where(e => DateOnly.FromDateTime(e.CreateAt) <= filter.DateTo);

        var listOrder = lsOrder
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize);

        var listOrderRes = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderRes>>(listOrder);

        var totalRecords = lsOrder.Count();
        var totalPages = Convert.ToInt32(Math.Ceiling(((double)totalRecords / (double)filter.PageSize)));

        var prevPage = filter.PageNumber - 1 >= 1 && filter.PageNumber <= totalPages
            ? _uriService.GetPageUri(
                new OrderPagingFilter
                {
                    CustomerId = filter.CustomerId,
                    PageNumber = filter.PageNumber - 1,
                    PageSize = filter.PageSize,
                    DateFrom = filter.DateFrom,
                    DateTo = filter.DateTo
                },
                _httpContextAccessor.HttpContext.Request.Path.Value)
            : null;

        var nextPage = filter.PageNumber >= 1 && filter.PageNumber <= totalPages
            ? _uriService.GetPageUri(
                new OrderPagingFilter
                {
                    CustomerId = filter.CustomerId,
                    PageNumber = filter.PageNumber + 1,
                    PageSize = filter.PageSize,
                    DateFrom = filter.DateFrom,
                    DateTo = filter.DateTo
                },
                _httpContextAccessor.HttpContext.Request.Path.Value)
            : null;
        var firstPage = filter.PageNumber >= 1 && filter.PageNumber <= totalPages
            ? _uriService.GetPageUri(
                new OrderPagingFilter
                {
                    CustomerId = filter.CustomerId,
                    PageNumber = 1,
                    PageSize = filter.PageSize,
                    DateFrom = filter.DateFrom,
                    DateTo = filter.DateTo
                },
                _httpContextAccessor.HttpContext.Request.Path.Value)
            : null;
        var lastPage = filter.PageNumber >= 1 && filter.PageNumber <= totalPages
            ? _uriService.GetPageUri(
                new OrderPagingFilter
                {
                    CustomerId = filter.CustomerId,
                    PageNumber = totalPages,
                    PageSize = filter.PageSize,
                    DateFrom = filter.DateFrom,
                    DateTo = filter.DateTo
                },
                _httpContextAccessor.HttpContext.Request.Path.Value)
            : null;
        var result = new PagedResponse<OrderRes>
        {
            PageNumber = filter.PageNumber,
            PageSize = filter.PageSize,
            FirstPage = firstPage,
            LastPage = lastPage,
            TotalRecords = totalRecords,
            TotalPages = totalPages,
            NextPage = nextPage,
            PreviousPage = prevPage,
            Data = listOrderRes
        };

        return result;
    }

    public async Task<OrderRes?> GetAsync(int id)
    {
        var order = await _context.Orders
            .Include(e => e.OrderDetails)
            .FirstOrDefaultAsync(e => e.Status != OrderStatus.Deleted && e.Id == id);

        return order is null ? null : _mapper.Map<Order, OrderRes>(order);
    }

    public async Task<int> CreateAsync(int sellerId, CreateOrderReq req)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var now = DateTime.Now;
            var order = _mapper.Map<CreateOrderReq, Order>(req, opt
                => opt.AfterMap((src, des) =>
                {
                    des.CreateAt = now;
                    des.UpdateAt = now;
                    des.SellerId = sellerId;
                }));

            await _context.Orders.AddAsync(order);

            await _context.SaveChangesAsync();

            await _orderDetailService.AddAsync(order.Id, req.OrderDetails);

            await transaction.CommitAsync();
            return order.Id;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<BaseResult> UpdateAsync(int id, UpdateOrderReq req)
    {
        var order = await _context.Orders
            .FirstOrDefaultAsync(e => e.Id == id && e.Status != OrderStatus.Deleted);

        if (order is null)
            return new FailureResult { Message = $"Not found order with Id: {id}" };

        order.Status = req.Status;

        await _context.SaveChangesAsync();

        return new SuccessResult();
    }

    public async Task<BaseResult> DeleteAsync(int id)
    {
        var order = await _context.Orders
            .FirstOrDefaultAsync(e => e.Id == id && e.Status != OrderStatus.Deleted);

        if (order is null)
            return new FailureResult { Message = $"Not found order with Id: {id}" };

        order.Status = OrderStatus.Deleted;

        await _context.SaveChangesAsync();

        return new SuccessResult();
    }

    public async Task<StatByCateRes> GetStatisticByCate(StatByCateQuery query)
    {
        var categories = _context.Categories
            .Include(e => e.Products)
            .ThenInclude(p => p.OrderDetails)
            .ThenInclude(od => od.Order)
            .ToList();

        var listRes = categories
            .GroupBy(e => e.Id)
            .Select(e => new
            {
                Id = e.Key,
                Quantity = e.Sum(ef => ef.Products.Sum(p => p.OrderDetails
                    .Where(orderDetail => orderDetail.Order.CreateAt != default)
                    .Sum(od => od.Quantity))),
                Cost = e.Sum(ef => ef.Products.Sum(p => p.OrderDetails
                    .Where(orderDetail => orderDetail.Order.CreateAt != default)
                    .Sum(od => od.Cost * od.Quantity))),
                Profit = e.Sum(ef => ef.Products.Sum(p => p.OrderDetails
                    .Where(orderDetail => orderDetail.Order.CreateAt != default)
                    .Sum(od => od.UnitPrice * od.Quantity))),
                Revenue = e.Sum(ef => ef.Products.Sum(p => p.OrderDetails
                    .Where(orderDetail => orderDetail.Order.CreateAt != default)
                    .Sum(od => (od.UnitPrice - od.Cost) * od.Quantity))),
            }).ToList();

        var result = new StatByCateRes();

        foreach (var b in listRes)
        {
            result.Revenue.Add(b.Revenue);
            result.Cost.Add(b.Cost);
            result.Profit.Add(b.Profit);
            result.Quantity.Add(b.Quantity);
            result.Id.Add(b.Id);
        }

        return result;
    }

    public async Task<StatByYearRes> GetStatisticByYear(StatByYearQuery query)
    {
        var result = new StatByYearRes();
        var listOrder = _context.Orders
            .Include(o => o.OrderDetails)
            .Where(o => o.CreateAt.Year == DateTime.Now.Year)
            .GroupBy(o => o.CreateAt.Month)
            .Select(o => new StatRes
            {
                Month = o.Key,
                Quantity = o.Sum(od => od.OrderDetails.Sum(ord => ord.Quantity)),
                Cost = o.Sum(od => od.OrderDetails.Sum(ord => ord.Cost * ord.Quantity)),
                Revenue = o.Sum(od => od.OrderDetails.Sum(ord => ord.UnitPrice * ord.Quantity)),
                Profit = o.Sum(od => od.OrderDetails.Sum(ord => (ord.UnitPrice - ord.Cost) * ord.Quantity)),
            }).ToList();

        result = _mapper.Map<ICollection<StatRes>, StatByYearRes>(listOrder, opt=>
            opt.AfterMap((src, des) =>
            {
                for (int i = 1; i <= 12; i++)
                {
                    if (!des.Month.Contains(i))
                    {
                        des.Month.Add(i);
                        des.Cost.Add(0);
                        des.Quantity.Add(0);
                        des.Profit.Add(0);
                        des.Revenue.Add(0);
                    }
                }
            }));
        return result;
    }
}

public class StatRes
{
    public int Month { get; set; } = 0;

    public int Quantity { get; set; } = 0;

    public int Cost { get; set; } = 0;

    public int Revenue { get; set; } = 0;

    public int Profit { get; set; } = 0;
}
//
// public class OrderDetailRes
// {
//     public int OrderId { get; set; }
//
//     public int ProductId { get; set; }
//
//     public int Cost { get; set; } = default;
//
//     public int UnitPrice { get; set; } = default;
//
//     public int Discount { get; set; } = default;
//
//     public int Quantity { get; set; } = default;
//
//     public int CategoryId { get; set; }
// }