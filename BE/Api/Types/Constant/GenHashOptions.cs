using shortid.Configuration;

namespace Api.Types.Constant;

/// <summary>
/// 
/// </summary>
public static class GenHashOptions
{
    /// <summary>
    /// 
    /// </summary>
    public static readonly GenerationOptions FileKey =
        new GenerationOptions(useNumbers: true, useSpecialCharacters: false, length: 14);

    /// <summary>
    /// 
    /// </summary>
    public static readonly GenerationOptions ShareLink =
        new GenerationOptions(useNumbers: true, length: 10);
}