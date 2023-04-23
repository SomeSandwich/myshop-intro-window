using System.Security.Cryptography;
using Api.Context.Entities;
using Api.Types.Objects;
using Api.Types.Objects.Product;
using AutoMapper;

namespace Api.Types.Mapping;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Dimensions, Dimensions>();

        CreateMap<Product, ProductRes>()
            .ForMember(des=>des.UpdateAt, opt=>
                opt.MapFrom(src=>DateOnly.FromDateTime(src.UpdateAt)))
            .ForMember(des => des.CategoryDescription, opt => 
                opt.MapFrom(src => src.Category.Description));

        CreateMap<CreateProductReq, CreateProductArg>();
        CreateMap<CreateProductArg, Product>();

        CreateMap<UpdateProductReq, UpdateProductArg>();
        CreateMap<UpdateProductArg, Product>();
    }
}