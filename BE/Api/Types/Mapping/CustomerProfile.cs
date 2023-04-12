using Api.Context.Entities;
using Api.Types.Objects;
using AutoMapper;

namespace Api.Types.Mapping;

public class CustomerProfile:Profile
{
    public CustomerProfile()
    {
        CreateMap<Customer, CustomerRes>();
        CreateMap<CreateCustomerReq, Customer>();
    }
}