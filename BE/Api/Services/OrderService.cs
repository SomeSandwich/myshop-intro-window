using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using Api.Types;
using Api.Types.Objects;
using API.Types.Objects;
using Api.Types.Objects.Order;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IOrderService
{
    Task<IEnumerable<OrderRes>> GetAsync(OrderFilter filter);
    Task<OrderRes?> GetAsync(int id);

    Task<int> CreateAsync(CreateOrderReq req);

    Task<bool> UpdateAsync(int id, UpdateOrderReq req);

    Task<bool> DeleteAsync(int id);
}

public class OrderService : IOrderService
{
    private readonly MyShopDbContext _context;
    private readonly IMapper _mapper;

    public OrderService(MyShopDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<OrderRes>> GetAsync(OrderFilter filter)
    {
        var listOrder = _context.Orders
            .OrderByDescending(e => e.CreateAt)
            .Include(e => e.OrderDetails)
            .Include(e => e.Customer)
            .AsEnumerable();

        listOrder = listOrder.Where(e =>
            e.CreateAt.CompareTo(filter.DateFrom) >= 0
            && e.CreateAt.CompareTo(filter.DateTo) <= 0);

        var list = listOrder;

        return _mapper.Map<IEnumerable<Order>, IEnumerable<OrderRes>>(list);
    }

    public async Task<OrderRes?> GetAsync(int id)
    {
        var order = await _context.Orders
            .FirstOrDefaultAsync(e => e.Status != OrderStatus.Deleted && e.Id == id);

        return order is null ? null : _mapper.Map<Order, OrderRes>(order);
    }

    public async Task<int> CreateAsync(CreateOrderReq req)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var now = DateTime.Now;
            var order = _mapper.Map<CreateOrderReq, Order>(req, opt
                => opt.AfterMap((src, des) =>
                {
                    des.CreateAt = now;
                    des.UpdateAt = now;
                }));

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            foreach (var detail in order.OrderDetails)
            {
                detail.OrderId = order.Id;
            }

            await _context.OrderDetails.AddRangeAsync(order.OrderDetails);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();
            return order.Id;
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<bool> UpdateAsync(int id, UpdateOrderReq req)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}