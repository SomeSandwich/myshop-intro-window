using Microsoft.Build.Framework;

namespace Api.Types.Objects.File;

public class DownloadFileReq
{
    [Required] public string Key { get; set; }
    public int? ExpireTimeInSecond { get; set; }
}