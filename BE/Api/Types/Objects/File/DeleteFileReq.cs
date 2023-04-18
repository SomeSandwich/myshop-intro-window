using Microsoft.Build.Framework;

namespace Api.Types.Objects.File;

public class DeleteFileReq
{
    [Required] public string Key { get; set; }
}