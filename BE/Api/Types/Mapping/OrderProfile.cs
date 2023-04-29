using Api.Context.Entities;
using Api.Services;
using Api.Types.Objects.Order;
using API.Types.Objects.OrderDetail;
using API.Types.Objects.Statistic;
using AutoMapper;

namespace Api.Types.Mapping;

public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<Order, OrderRes>();

        CreateMap<CreateOrderDetailReq, OrderDetail>();
        CreateMap<CreateOrderReq, Order>();

        CreateMap<ICollection<StatByYearDto>, StatByYearRes>()
            .ForMember(des => des.Month, opt =>
                opt.MapFrom(src => src.Select(e => e.Month)))
            .ForMember(des => des.Quantity, opt =>
                opt.MapFrom(src => src.Select(e => e.Quantity)))
            .ForMember(des => des.Revenue, opt =>
                opt.MapFrom(src => src.Select(e => e.Revenue)))
            .ForMember(des => des.Profit, opt =>
                opt.MapFrom(src => src.Select(e => e.Profit)))
            .ForMember(des => des.Cost, opt =>
                opt.MapFrom(src => src.Select(e => e.Cost)));
        
        
        CreateMap<ICollection<StatByMonthDto>, StatByMonthRes>()
            .ForMember(des => des.Date, opt =>
                opt.MapFrom(src => src.Select(e => e.Date)))
            .ForMember(des => des.Quantity, opt =>
                opt.MapFrom(src => src.Select(e => e.Quantity)))
            .ForMember(des => des.Revenue, opt =>
                opt.MapFrom(src => src.Select(e => e.Revenue)))
            .ForMember(des => des.Profit, opt =>
                opt.MapFrom(src => src.Select(e => e.Profit)))
            .ForMember(des => des.Cost, opt =>
                opt.MapFrom(src => src.Select(e => e.Cost)));
        
        CreateMap<ICollection<StatByWeekDto>, StatByWeekRes>()
            .ForMember(des => des.Date, opt =>
                opt.MapFrom(src => src.Select(e => e.Date)))
            .ForMember(des => des.Quantity, opt =>
                opt.MapFrom(src => src.Select(e => e.Quantity)))
            .ForMember(des => des.Revenue, opt =>
                opt.MapFrom(src => src.Select(e => e.Revenue)))
            .ForMember(des => des.Profit, opt =>
                opt.MapFrom(src => src.Select(e => e.Profit)))
            .ForMember(des => des.Cost, opt =>
                opt.MapFrom(src => src.Select(e => e.Cost)));
        
        CreateMap<ICollection<StatByDateDto>, StatByDateRes>()
            .ForMember(des => des.Date, opt =>
                opt.MapFrom(src => src.Select(e => e.Date)))
            .ForMember(des => des.Quantity, opt =>
                opt.MapFrom(src => src.Select(e => e.Quantity)))
            .ForMember(des => des.Revenue, opt =>
                opt.MapFrom(src => src.Select(e => e.Revenue)))
            .ForMember(des => des.Profit, opt =>
                opt.MapFrom(src => src.Select(e => e.Profit)))
            .ForMember(des => des.Cost, opt =>
                opt.MapFrom(src => src.Select(e => e.Cost)));
    }
}
