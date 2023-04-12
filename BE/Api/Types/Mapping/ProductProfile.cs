using Api.Context.Entities;
using Api.Types.Objects;
using AutoMapper;

namespace Api.Types.Mapping;

public class ProductProfile: Profile
{
    public ProductProfile()
    {
        CreateMap<Dimensions, Dimensions>();
        
        CreateMap<Product, ProductRes>();
        
        CreateMap<CreateProductReq, CreateProductArg>();
        CreateMap<CreateProductArg, Product>();

        CreateMap<UpdateProductReq, UpdateProductArg>();
        CreateMap<UpdateProductArg, Product>();
    }
}