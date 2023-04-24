using Api.Context;
using Api.Context.Entities;
using Api.Types.Mapping;
using Api.Types.Objects;
using Api.Types.Results;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface ICategoryService
{
    Task<IEnumerable<CategoryRes>> GetAsync();
    Task<CategoryRes> GetAsync(int id);

    Task<int> CreateAsync(CreateCategoryReq req);

    Task<BaseResult> UpdateAsync(int id, UpdateCategoryReq req);

    Task<BaseResult> DeleteAsync(int id);
}

public class CategoryService : ICategoryService
{
    private readonly MyShopDbContext _context;

    private readonly IMapper _mapper;

    public CategoryService(MyShopDbContext context)
    {
        _context = context;

        var config = new MapperConfiguration(opt => { opt.AddProfile<CategoryProfile>(); });

        _mapper = config.CreateMapper();
    }

    public async Task<IEnumerable<CategoryRes>> GetAsync()
    {
        var cates = _context.Categories
            .Include(e => e.Products)
            .AsEnumerable();

        return _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryRes>>(cates);
    }

    public async Task<CategoryRes> GetAsync(int id)
    {
        var cate = await _context.Categories
            .Include(e => e.Products)
            .FirstOrDefaultAsync(e => e.Id == id);

        return _mapper.Map<Category, CategoryRes>(cate);
    }

    public async Task<int> CreateAsync(CreateCategoryReq req)
    {
        var cate = _mapper.Map<CreateCategoryReq, Category>(req);

        await _context.Categories.AddAsync(cate);

        await _context.SaveChangesAsync();

        return cate.Id;
    }

    public async Task<BaseResult> UpdateAsync(int id, UpdateCategoryReq req)
    {
        var cate = await _context.Categories
            .FirstOrDefaultAsync(e => e.Id == id);

        if (cate is null)
            return new FailureResult
            {
                Message = $"Not Found Category With Id:{id}"
            };

        if (req.Description is not null)
            if (cate.Description != req.Description)
                cate.Description = req.Description;

        await _context.SaveChangesAsync();

        return new SuccessResult { Message = "Update Category Success" };
    }

    public async Task<BaseResult> DeleteAsync(int id)
    {
        var cate = await _context.Categories
            .Include(e => e.Products)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (cate is null)
            return new FailureResult
            {
                Message = $"Not Found Category With Id:{id}"
            };

        if (cate.Products.Count > 0)
            return new FailureResult
            {
                Message = $"The Category Has Product, Count:{cate.Products.Count}"
            };

        _context.Categories
            .Remove(cate);

        await _context.SaveChangesAsync();

        return new SuccessResult { Message = "Delete Category Success" };
    }
}