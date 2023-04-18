namespace Api.Types.Objects.File;

public class UploadFileDto
{
    public string Key { get; set; }
    public Stream Stream { get; set; }
    public string? ContentType { get; set; }
    public Dictionary<string, string> Metadata { get; set; }
}