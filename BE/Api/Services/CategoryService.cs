using Api.Context;
using Api.Types;
using Api.Types.Objects;

namespace Api.Services;

public interface ICategoryService
{
    Task<IEnumerable<CategoryRes>> GetAsync();
    Task<CategoryRes> GetAsync(int id);

    Task<int> CreateAsync(CreateAccountReq req);

    Task<bool> UpdateAsync(int id, UpdateAccountReq req);

    Task<bool> DeleteAsync(int id);
}

public class CategoryService : ICategoryService
{
    private readonly MyShopDbContext _context;

    public CategoryService(MyShopDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CategoryRes>> GetAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<CategoryRes> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<int> CreateAsync(CreateAccountReq req)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> UpdateAsync(int id, UpdateAccountReq req)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}