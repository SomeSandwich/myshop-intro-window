using Api.Context;
using Api.Types;
using Api.Types.Objects;

namespace Api.Services;

public interface IProductService
{
    Task<IEnumerable<ProductRes>> GetAsync();
    Task<IEnumerable<ProductRes>> GetByCategoryAsync(int cateId);
    Task<ProductRes> GetAsync(int id);

    Task<int> CreateAsync(CreateProductArg arg);

    Task<bool> UpdateAsync(int id, UpdateProductArg arg);

    Task<bool> DeleteAsync(int id);
}

public class ProductService : IProductService
{
    private readonly MyShopDbContext _context;

    public ProductService(MyShopDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductRes>> GetAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<ProductRes>> GetByCategoryAsync(int cateId)
    {
        throw new NotImplementedException();
    }

    public async Task<ProductRes> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<int> CreateAsync(CreateProductArg arg)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> UpdateAsync(int id, UpdateProductArg arg)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}