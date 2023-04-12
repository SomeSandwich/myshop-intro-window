using System.Security.Cryptography;
using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using Api.Types;
using Api.Types.Mapping;
using Api.Types.Objects;
using Api.Types.Results;
using AutoMapper;

namespace Api.Services;

public interface IProductService
{
    Task<IEnumerable<ProductRes>> GetAsync();
    Task<IEnumerable<ProductRes>> GetByCategoryAsync(int cateId);
    Task<ProductRes?> GetAsync(int id);

    Task<int> CreateAsync(CreateProductArg arg);

    Task<BaseResult> UpdateAsync(int id, UpdateProductArg arg);

    Task<BaseResult> DeleteAsync(int id);
}

public class ProductService : IProductService
{
    private readonly MyShopDbContext _context;
    private readonly IMapper _mapper;

    public ProductService(MyShopDbContext context)
    {
        _context = context;

        var config = new MapperConfiguration(opt => { opt.AddProfile<ProductProfile>(); });
        _mapper = config.CreateMapper();
    }

    public async Task<IEnumerable<ProductRes>> GetAsync()
    {
        var list = _context.Products
            .Where(e => e.Status != ProductStatus.Deleted)
            .AsEnumerable();

        return _mapper.Map<IEnumerable<Product>, IEnumerable<ProductRes>>(list);
    }

    public async Task<IEnumerable<ProductRes>> GetByCategoryAsync(int cateId)
    {
        var listAcc = _context.Products
            .Where(e => e.Status != ProductStatus.Deleted && e.CategoryId == cateId)
            .AsEnumerable();

        return _mapper.Map<IEnumerable<Product>, IEnumerable<ProductRes>>(listAcc);
    }

    public async Task<ProductRes?> GetAsync(int id)
    {
        var acc = _context.Products
            .FirstOrDefault(e => e.Status != ProductStatus.Deleted && e.Id == id);

        return acc is null ? null : _mapper.Map<Product, ProductRes>(acc);
    }

    public async Task<int> CreateAsync(CreateProductArg arg)
    {
        var now = DateTime.Now;

        var product = _mapper.Map<CreateProductArg, Product>(arg, opts =>
            opts.AfterMap((src, des) =>
            {
                des.CreateAt = now;
                des.UpdateAt = now;
            }));

        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();

        return product.Id;
    }

    public async Task<BaseResult> UpdateAsync(int id, UpdateProductArg arg)
    {
        var product = _context.Products
            .FirstOrDefault(e => e.Id == id && e.Status != ProductStatus.Deleted);

        if (product is null)
            return new FailureResult { Message = $"Not found product with id: {id}" };

        product.Price = arg.Price ?? product.Price;
        product.Discount = arg.Discount ?? product.Discount;
        product.Description = arg.Description ?? product.Description;
        product.Quantity = arg.Quantity ?? product.Quantity;
        product.CategoryId = arg.CategoryId ?? product.CategoryId;

        if (arg.MediaFilesDel is not null)
            foreach (var filePath in arg.MediaFilesDel)
            {
                product.MediaPath.Remove(filePath);
            }

        if (arg.MediaFilesAdd is not null)
        {
            foreach (var filePath in arg.MediaFilesAdd)
            {
                product.MediaPath.Add(filePath);
            }
        }

        await _context.SaveChangesAsync();

        return new SuccessResult();
    }

    public async Task<BaseResult> DeleteAsync(int id)
    {
        var prod = _context.Products.FirstOrDefault(e => e.Id == id && e.Status != ProductStatus.Deleted);

        if (prod is null)
            return new FailureResult { Message = $"Not found productId: {id}" };

        _context.Products.Remove(prod);
        await _context.SaveChangesAsync();
        
        return new SuccessResult();
    }
}