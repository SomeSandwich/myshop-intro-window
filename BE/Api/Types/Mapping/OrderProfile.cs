using Api.Context.Entities;
using Api.Types.Objects.Order;
using API.Types.Objects.OrderDetail;
using AutoMapper;

namespace Api.Types.Mapping;

public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<Order, OrderRes>();

        CreateMap<CreateOrderDetailReq, OrderDetail>();
        CreateMap<CreateOrderReq, Order>();
    }
}