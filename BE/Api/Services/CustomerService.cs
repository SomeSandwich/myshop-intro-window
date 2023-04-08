using Api.Context;
using Api.Types;
using Api.Types.Objects;

namespace Api.Services;


public interface ICustomerService
{
    Task<IEnumerable<CustomerRes>> GetAsync();
    Task<CustomerRes> GetAsync(int id);

    Task<int> CreateAsync(int id,CreateCustomerReq req);

    Task<bool> UpdateAsync(int id,UpdateCustomerReq req);

    Task<bool> DeleteAsync(int id);
}

public class CustomerService :ICustomerService
{
    private readonly MyShopDbContext _context;

    public CustomerService(MyShopDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CustomerRes>> GetAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<CustomerRes> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<int> CreateAsync(int id, CreateCustomerReq req)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> UpdateAsync(int id, UpdateCustomerReq req)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}