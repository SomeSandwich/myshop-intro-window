using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using API.Types.Objects.Filter;
using Api.Types.Objects.Order;
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
}