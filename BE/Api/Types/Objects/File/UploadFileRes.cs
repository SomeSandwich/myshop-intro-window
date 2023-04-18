namespace Api.Types.Objects.File;

public class UploadFileRes
{
    public string Bucket { get; set; }
    public string Key { get; set; }
    public string OldName { get; set; }
}