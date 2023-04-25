using Api.Context.Entities;
using Api.Types.Objects.Order;
using API.Types.Objects.OrderDetail;
using AutoMapper;

namespace Api.Types.Mapping;

public class OrderDetailProfile : Profile
{
    public OrderDetailProfile()
    {
        CreateMap<CreateOrderDetailReq, OrderDetail>();
        CreateMap<OrderDetail, OrderDetailRes>();
    }
}