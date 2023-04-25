using Api.Context.Entities;
using Api.Types.Objects.Customer;
using AutoMapper;

namespace Api.Types.Mapping;

public class CustomerProfile : Profile
{
    public CustomerProfile()
    {
        CreateMap<Customer, CustomerRes>().ForMember(des => des.Orders, opt => opt.Ignore());
        CreateMap<CreateCustomerReq, Customer>();
    }
}