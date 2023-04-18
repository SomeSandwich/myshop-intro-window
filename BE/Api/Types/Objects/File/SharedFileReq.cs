using Microsoft.Build.Framework;

namespace Api.Types.Objects.File;

public class SharedFileReq
{
    [Required] public string Hash { get; set; }
}