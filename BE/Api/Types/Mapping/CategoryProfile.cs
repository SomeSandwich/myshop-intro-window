using Api.Context.Entities;
using Api.Types.Objects;
using AutoMapper;

namespace Api.Types.Mapping;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, CategoryRes>();
        CreateMap<CreateCategoryReq, Category>();
    }
}