using Microsoft.Build.Framework;

namespace Api.Types.Objects.File;

public class UploadSmallFileReq
{
    [Required] public IFormFile File { get; set; }

    public string? Folder { get; set; }
}