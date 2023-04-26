using Api.Context.Entities;
using Api.Types.Objects.Order;
using API.Types.Objects.OrderDetail;
using AutoMapper;
using OrderDetailRes = Api.Services.OrderDetailRes;

namespace Api.Types.Mapping;

public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<Order, OrderRes>();

        CreateMap<OrderDetail, OrderDetailRes>().ForMember(des => des.CategoryId, opt
            => opt.MapFrom(src => src.Product.CategoryId));

        CreateMap<CreateOrderDetailReq, OrderDetail>();
        CreateMap<CreateOrderReq, Order>();
    }
}