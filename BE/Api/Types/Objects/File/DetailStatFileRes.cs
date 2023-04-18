namespace Api.Types.Objects.File;

public class DetailStatFileRes
{
    public string Key { get; set; }
    public long Size { get; set; }
    public string ContentType { get; set; }
    public Dictionary<string, string> MetaData { get; set; }
}