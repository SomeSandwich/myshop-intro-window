using Api.Context.Entities;
using Api.Types.Objects;
using AutoMapper;

namespace Api.Types.Mapping;

public class ProductProfile: Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductRes>();
        CreateMap<CreateProductReq, CreateProductArg>();
    }
}