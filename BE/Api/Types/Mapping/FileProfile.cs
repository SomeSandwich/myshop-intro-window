using API.Types.Objects;
using Api.Types.Objects.File;
using AutoMapper;
using Minio.DataModel;
using Item = Minio.DataModel.Item;

namespace API.Types.Mapping;

public class FileProfile : Profile
{
    public FileProfile()
    {
        CreateMap<Item, StatFileRes>();
        CreateMap<ObjectStat, DetailStatFileRes>()
            .ForMember(des => des.Key,
                opt => opt.MapFrom(src => src.ObjectName));
    }
}