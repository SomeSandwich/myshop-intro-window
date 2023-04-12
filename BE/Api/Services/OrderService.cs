using Api.Context;
using Api.Types;
using Api.Types.Objects;

namespace Api.Services;

public interface IOrderService
{
    Task<IEnumerable<OrderRes>> GetAsync();
    Task<OrderRes?> GetAsync(int id);

    Task<int> CreateAsync(CreateOrderReq req);

    Task<bool> UpdateAsync(int id, UpdateOrderReq req);

    Task<bool> DeleteAsync(int id);
}

public class OrderService : IOrderService
{
    private readonly MyShopDbContext _context;

    public OrderService(MyShopDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OrderRes>> GetAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<OrderRes?> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<int> CreateAsync(CreateOrderReq req)
    {
        throw new NotImplementedException();
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