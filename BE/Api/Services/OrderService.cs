using System.Collections;
using System.Diagnostics;
using System.Globalization;
using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using API.Types.Objects.Filter;
using Api.Types.Objects.Order;
using API.Types.Objects.Statistic;
using Api.Types.Results;
using AutoMapper;
using System.Web;
using API.Types.Objects.OrderDetail;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IOrderService
{
    Task<PagedResponse<OrderRes>> GetAsync(OrderPagingFilter filter);
    Task<OrderRes?> GetAsync(int id);
    Task<IEnumerable<OrderRes>> GetByCustomerAsync(int customerId);

    Task<BaseResult> CreateAsync(int sellerId, CreateOrderReq req);

    Task<BaseResult> UpdateAsync(int id, UpdateOrderReq req);

    Task<BaseResult> DeleteAsync(int id);

    Task<StatByCateRes> GetStatisticByCate(StatByCateQuery query);
    Task<StatByYearRes> GetStatisticByYear(StatByYearQuery query);
    Task<StatByMonthRes> GetStatisticByMonth(StatByMonthQuery query);
    Task<StatByWeekRes> GetStatisticByWeek(StatByWeekQuery query);
    Task<StatByDateRes> GetStatisticByDate(StatByDateQuery query);


    public Task<DateTime> _firstDateOfWeek(int year, int weekNum,
        CalendarWeekRule rule = CalendarWeekRule.FirstFullWeek);
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
            .Where(e => e.Status != OrderStatus.Deleted)
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
            .Include(e => e.Customer)
            .Include(e => e.OrderDetails)
            .FirstOrDefaultAsync(e => e.Status != OrderStatus.Deleted && e.Id == id);

        return order is null ? null : _mapper.Map<Order, OrderRes>(order);
    }

    public async Task<IEnumerable<OrderRes>> GetByCustomerAsync(int customerId)
    {
        var order = _context.Orders
            .Include(e => e.OrderDetails)
            .Include(e => e.Customer)
            .Where(e => e.CustomerId == customerId && e.Status != OrderStatus.Deleted)
            .AsEnumerable();

        return _mapper.Map<IEnumerable<Order>, IEnumerable<OrderRes>>(order);
    }

    public async Task<BaseResult> CreateAsync(int sellerId, CreateOrderReq req)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var listProdId = (req.OrderDetails).ToDictionary(p => p.ProductId, detailReq => detailReq.Quantity);

            var listKey = listProdId.Keys;
            var listProduct = _context.Products
                .Where(p => listKey.Contains(p.Id))
                .ToList();

            var lackingProducts = (
                    from product in listProdId.Where(product => true)
                    select listProduct.FirstOrDefault(p => p.Id == product.Key && p.Quantity - product.Value < 0)
                    into product
                    where product != null
                    select product.Id)
                .ToList();

            if (lackingProducts.Count > 0)
                return new FailureWithData() { Data = new { LackingProducts = lackingProducts } };

            foreach (var product in listProduct)
            {
                product.Quantity -= listProdId[product.Id];
            }

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
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();
            return new SuccessWithDataResult() { Data = new { orderId = order.Id } };
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
            .Include(o=>o.OrderDetails)
            .FirstOrDefaultAsync(e => e.Id == id && e.Status != OrderStatus.Deleted);

        if (order is null)
            return new FailureResult { Message = $"Not found order with Id: {id}" };

        order.Status = OrderStatus.Deleted;
        
        var listProdId = (order.OrderDetails).ToDictionary(p => p.ProductId, detailReq => detailReq.Quantity);
        var listKey = listProdId.Keys;
        var listProduct = _context.Products
            .Where(p => listKey.Contains(p.Id))
            .ToList();
        foreach (var product in listProduct)
        {
            product.Quantity += listProdId[product.Id];
        }

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
                    .Where(orderDetail =>
                        DateOnly.FromDateTime(orderDetail.Order.CreateAt).CompareTo(query.DateFrom) >= 0
                        &&
                        DateOnly.FromDateTime(orderDetail.Order.CreateAt).CompareTo(query.DateTo) <= 0
                        &&
                        orderDetail.Order.Status != OrderStatus.Deleted)
                    .Sum(od => od.Quantity))),
                Cost = e.Sum(ef => ef.Products.Sum(p => p.OrderDetails
                    .Where(orderDetail =>
                        DateOnly.FromDateTime(orderDetail.Order.CreateAt).CompareTo(query.DateFrom) >= 0
                        &&
                        DateOnly.FromDateTime(orderDetail.Order.CreateAt).CompareTo(query.DateTo) <= 0
                        &&
                        orderDetail.Order.Status != OrderStatus.Deleted)
                    .Sum(od => od.Cost * od.Quantity))),
                Profit = e.Sum(ef => ef.Products.Sum(p => p.OrderDetails
                    .Where(orderDetail =>
                        DateOnly.FromDateTime(orderDetail.Order.CreateAt).CompareTo(query.DateFrom) >= 0
                        &&
                        DateOnly.FromDateTime(orderDetail.Order.CreateAt).CompareTo(query.DateTo) <= 0
                        &&
                        orderDetail.Order.Status != OrderStatus.Deleted)
                    .Sum(od => od.UnitPrice * od.Quantity))),
                Revenue = e.Sum(ef => ef.Products.Sum(p => p.OrderDetails
                    .Where(orderDetail =>
                        DateOnly.FromDateTime(orderDetail.Order.CreateAt).CompareTo(query.DateFrom) >= 0
                        &&
                        DateOnly.FromDateTime(orderDetail.Order.CreateAt).CompareTo(query.DateTo) <= 0
                        &&
                        orderDetail.Order.Status != OrderStatus.Deleted)
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
            .Where(o => o.CreateAt.Year == DateTime.Now.Year && o.Status != OrderStatus.Deleted)
            .GroupBy(o => o.CreateAt.Month)
            .Select(o => new StatByYearDto()
            {
                Month = o.Key,
                Quantity = o.Sum(od => od.OrderDetails.Sum(ord => ord.Quantity)),
                Cost = o.Sum(od => od.OrderDetails.Sum(ord => ord.Cost * ord.Quantity)),
                Revenue = o.Sum(od => od.OrderDetails.Sum(ord => ord.UnitPrice * ord.Quantity)),
                Profit = o.Sum(od => od.OrderDetails.Sum(ord => (ord.UnitPrice - ord.Cost) * ord.Quantity)),
            }).ToList();

        var listSortedDto = new SortedList<int, StatByYearDto>();
        foreach (var order in listOrder) // Add day in db 
        {
            listSortedDto.Add(order.Month, order);
        }

        for (var i = 1; i <= 12; i++)
        {
            if (!listSortedDto.ContainsKey(i))
                listSortedDto.Add(i, new StatByYearDto
                {
                    Month = i,
                    Quantity = 0,
                    Cost = 0,
                    Revenue = 0,
                    Profit = 0,
                });
        }

        result = _mapper.Map<IList<StatByYearDto>, StatByYearRes>(listSortedDto.Values);
        return result;
    }

    public async Task<StatByMonthRes> GetStatisticByMonth(StatByMonthQuery query)
    {
        var listStatOrderByMonth = _context.Orders
            .Include(o => o.OrderDetails)
            .Where(o => o.CreateAt.Year == query.Year && o.CreateAt.Month == query.Month &&
                        o.Status != OrderStatus.Deleted)
            .GroupBy(o => DateOnly.FromDateTime(o.CreateAt))
            .Select(o => new StatByMonthDto()
            {
                Date = o.Key,
                Quantity = o.Sum(od => od.OrderDetails.Sum(ord => ord.Quantity)),
                Cost = o.Sum(od => od.OrderDetails.Sum(ord => ord.Cost * ord.Quantity)),
                Revenue = o.Sum(od => od.OrderDetails.Sum(ord => ord.UnitPrice * ord.Quantity)),
                Profit = o.Sum(od => od.OrderDetails.Sum(ord => (ord.UnitPrice - ord.Cost) * ord.Quantity)),
            })
            .AsEnumerable();

        var dateFrom = new DateOnly(query.Year, query.Month, 1); // Day begin of month
        var lastDate = DateTime.DaysInMonth(dateFrom.Year, dateFrom.Month); // Get last day of month
        var dateTo = new DateOnly(dateFrom.Year, dateFrom.Month, lastDate);

        var dates = new List<DateOnly>();

        for (var dt = dateFrom; dateTo >= dt; dt = dt.AddDays(1)) // List day from 'dateFrom' to 'dateTo'
        {
            dates.Add(dt);
        }

        var listSortedDto = new SortedList<DateOnly, StatByMonthDto>();
        foreach (var statOrderByMonth in listStatOrderByMonth) // Add day in db 
        {
            listSortedDto.Add(statOrderByMonth.Date, statOrderByMonth);
        }

        foreach (var day in
                 dates.Where(day => !listSortedDto.ContainsKey(day))) // Add day not found in db but in list 'dates'
        {
            listSortedDto.Add(day, new StatByMonthDto
            {
                Date = day,
                Quantity = 0,
                Cost = 0,
                Revenue = 0,
                Profit = 0,
            });
        }

        var result = _mapper.Map<IList<StatByMonthDto>, StatByMonthRes>(listSortedDto.Values);
        return result;
    }

    public async Task<StatByWeekRes> GetStatisticByWeek(StatByWeekQuery query)
    {
        var dateFrom = DateOnly.FromDateTime(await _firstDateOfWeek(query.Year, query.Week)); // Day begin of month
        var dateTo = dateFrom.AddDays(6);

        var listStatOrderByMonth = _context.Orders
            .Include(o => o.OrderDetails)
            .Where(o => DateOnly.FromDateTime(o.CreateAt) >= dateFrom && DateOnly.FromDateTime(o.CreateAt) <= dateTo &&
                        o.Status != OrderStatus.Deleted)
            .GroupBy(o => DateOnly.FromDateTime(o.CreateAt))
            .Select(o => new StatByWeekDto()
            {
                Date = o.Key,
                Quantity = o.Sum(od => od.OrderDetails.Sum(ord => ord.Quantity)),
                Cost = o.Sum(od => od.OrderDetails.Sum(ord => ord.Cost * ord.Quantity)),
                Revenue = o.Sum(od => od.OrderDetails.Sum(ord => ord.UnitPrice * ord.Quantity)),
                Profit = o.Sum(od => od.OrderDetails.Sum(ord => (ord.UnitPrice - ord.Cost) * ord.Quantity)),
            })
            .AsEnumerable();

        var dates = new List<DateOnly>();


        for (var dt = dateFrom; dt <= dateTo; dt = dt.AddDays(1)) // List day from 'dateFrom' to 'dateTo'
        {
            dates.Add(dt);
        }

        var listSortedDto = new SortedList<DateOnly, StatByWeekDto>();
        foreach (var statOrderByMonth in listStatOrderByMonth) // Add day in db 
        {
            listSortedDto.Add(statOrderByMonth.Date, statOrderByMonth);
        }

        foreach (var day in
                 dates.Where(day => !listSortedDto.ContainsKey(day))) // Add day not found in db but in list 'dates'
        {
            listSortedDto.Add(day, new StatByWeekDto()
            {
                Date = day,
                Quantity = 0,
                Cost = 0,
                Revenue = 0,
                Profit = 0,
            });
        }

        var result = _mapper.Map<IList<StatByWeekDto>, StatByWeekRes>(listSortedDto.Values);
        return result;
    }

    public async Task<StatByDateRes> GetStatisticByDate(StatByDateQuery query)
    {
        var dateFrom = query.DateFrom; // Day begin of month
        var dateTo = query.DateTo;
        var abc = dateTo.DayNumber - dateFrom.DayNumber;
        if (abc > 30)
            dateTo = dateFrom.AddDays(30);

        var listStatOrderByMonth = _context.Orders
            .Include(o => o.OrderDetails)
            .Where(o => DateOnly.FromDateTime(o.CreateAt) >= dateFrom && DateOnly.FromDateTime(o.CreateAt) <= dateTo &&
                        o.Status != OrderStatus.Deleted)
            .GroupBy(o => DateOnly.FromDateTime(o.CreateAt))
            .Select(o => new StatByDateDto()
            {
                Date = o.Key,
                Quantity = o.Sum(od => od.OrderDetails.Sum(ord => ord.Quantity)),
                Cost = o.Sum(od => od.OrderDetails.Sum(ord => ord.Cost * ord.Quantity)),
                Revenue = o.Sum(od => od.OrderDetails.Sum(ord => ord.UnitPrice * ord.Quantity)),
                Profit = o.Sum(od => od.OrderDetails.Sum(ord => (ord.UnitPrice - ord.Cost) * ord.Quantity)),
            })
            .AsEnumerable();

        var dates = new List<DateOnly>();


        for (var dt = dateFrom; dt <= dateTo; dt = dt.AddDays(1)) // List day from 'dateFrom' to 'dateTo'
        {
            dates.Add(dt);
        }

        var listSortedDto = new SortedList<DateOnly, StatByDateDto>();
        foreach (var statOrderByMonth in listStatOrderByMonth) // Add day in db 
        {
            listSortedDto.Add(statOrderByMonth.Date, statOrderByMonth);
        }

        foreach (var day in
                 dates.Where(day => !listSortedDto.ContainsKey(day))) // Add day not found in db but in list 'dates'
        {
            listSortedDto.Add(day, new StatByDateDto()
            {
                Date = day,
                Quantity = 0,
                Cost = 0,
                Revenue = 0,
                Profit = 0,
            });
        }

        var result = _mapper.Map<IList<StatByDateDto>, StatByDateRes>(listSortedDto.Values);
        return result;
    }

    public async Task<DateTime> _firstDateOfWeek(int year, int weekNum,
        CalendarWeekRule rule = CalendarWeekRule.FirstFullWeek)
    {
        Debug.Assert(weekNum >= 1);
        DateTime jan1 = new DateTime(year, 1, 1);
        int daysOffset = DayOfWeek.Monday - jan1.DayOfWeek;
        DateTime firstMonday = jan1.AddDays(daysOffset);
        Debug.Assert(firstMonday.DayOfWeek == DayOfWeek.Monday);

        var cal = CultureInfo.CurrentCulture.Calendar;
        int firstWeek = cal.GetWeekOfYear(firstMonday, rule, DayOfWeek.Monday);

        if (firstWeek <= 1)
        {
            weekNum -= 1;
        }

        DateTime result = firstMonday.AddDays(weekNum * 7);
        return result;
    }
}

// public class StatRes
// {
//     public int Month { get; set; } = 0;
//
//     public int Quantity { get; set; } = 0;
//
//     public int Cost { get; set; } = 0;
//
//     public int Revenue { get; set; } = 0;
//
//     public int Profit { get; set; } = 0;
// }


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