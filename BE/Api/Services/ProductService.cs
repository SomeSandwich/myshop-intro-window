using System.Text.Json;
using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using Api.Types.Objects.Product;
using Api.Types.Results;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IProductService
{
    Task<IEnumerable<ProductRes>> GetAsync();
    Task<IEnumerable<ProductRes>> GetByCategoryAsync(int cateId);
    Task<ProductRes?> GetAsync(int id);
    Task<IEnumerable<ProductRes>> SearchProduct(string query);

    Task<bool> CheckProductExists(int id);

    Task<int> CreateAsync(CreateProductArg arg);

    Task<BaseResult> UpdateAsync(int id, UpdateProductArg arg);

    Task<BaseResult> DeleteAsync(int id);
}

public class ProductService : IProductService
{
    private readonly MyShopDbContext _context;

    private readonly IMapper _mapper;

    public ProductService(MyShopDbContext context, IMapper mapper)
    {
        _context = context;

        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductRes>> GetAsync()
    {
        var list = _context.Products
            .Include(e => e.Category)
            .Where(e => e.Status != ProductStatus.Deleted)
            .AsEnumerable();

        return _mapper.Map<IEnumerable<Product>, IEnumerable<ProductRes>>(list);
    }

    public async Task<IEnumerable<ProductRes>> GetByCategoryAsync(int cateId)
    {
        var listAcc = await _context.Products
            .Include(e => e.Category)
            .Where(e => e.Status != ProductStatus.Deleted && e.CategoryId == cateId)
            .ToListAsync();

        return _mapper.Map<IEnumerable<Product>, IEnumerable<ProductRes>>(listAcc);
    }

    public async Task<ProductRes?> GetAsync(int id)
    {
        var acc = _context.Products
            .Include(e => e.Category)
            .FirstOrDefault(e => e.Status != ProductStatus.Deleted && e.Id == id);

        return acc is null ? null : _mapper.Map<Product, ProductRes>(acc);
    }

    public async Task<IEnumerable<ProductRes>> SearchProduct(string query)
    {
        var listProduct = _context.Products
            .Include(p => p.Category)
            .Where(p=>p.Status == ProductStatus.Default)
            .AsEnumerable();
        
        var abc = listProduct
            .Where(p => p.Title.Trim().Contains(query))
            .AsEnumerable();

        return _mapper.Map<IEnumerable<Product>, IEnumerable<ProductRes>>(abc);
    }

    public async Task<bool> CheckProductExists(int id)
    {
        var acc = _context.Products
            .AsNoTracking()
            .Any(e => e.Id == id && e.Status != ProductStatus.Deleted);

        return acc;
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

        product.Cost = arg.Cost ?? product.Cost;
        product.Price = arg.Price ?? product.Price;
        product.Discount = arg.Discount ?? product.Discount;
        product.Title = arg.Title ?? product.Title;
        product.Description = arg.Description ?? product.Description;
        product.Quantity = arg.Quantity ?? product.Quantity;
        product.CategoryId = arg.CategoryId ?? product.CategoryId;
        product.Author = arg.Author ?? product.Author;
        product.Isbn10 = arg.Isbn10 ?? product.Isbn10;
        product.Isbn13 = arg.Isbn13 ?? product.Isbn13;
        product.Publisher = arg.Publisher ?? product.Publisher;
        product.PublicationDate = arg.PublicationDate ?? product.PublicationDate;
        product.NumPages = arg.NumPages ?? product.NumPages;
        product.CoverType = arg.CoverType ?? product.CoverType;

        if (arg.Dimension is { Width: not null, Height: not null, Length: not null })
            product.DimensionJSON = JsonSerializer.Serialize(arg.Dimension);

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
        product.UpdateAt = DateTime.Now;

        await _context.SaveChangesAsync();

        return new SuccessResult();
    }

    public async Task<BaseResult> DeleteAsync(int id)
    {
        var prod = _context.Products.FirstOrDefault(e => e.Id == id && e.Status != ProductStatus.Deleted);

        if (prod is null)
            return new FailureResult { Message = $"Not found productId: {id}" };

        prod.Status = ProductStatus.Deleted;
        await _context.SaveChangesAsync();

        return new SuccessResult();
    }
}