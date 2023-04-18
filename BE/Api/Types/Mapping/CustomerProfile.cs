using Api.Context.Entities;
using Api.Types.Objects;
using Api.Types.Objects.Customer;
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