using Api.Context.Entities;
using Api.Types.Objects;
using Api.Utils;
using AutoMapper;

namespace Api.Types.Mapping;

public class AccountProfile : Profile
{
    public AccountProfile()
    {
        CreateMap<Account, AccountRes>();
        
        CreateMap<CreateAccountReq, Account>()
            .ForMember(des => des.Password, opt =>
                opt.MapFrom(src => src.Password.HashPassword()));
    }
}