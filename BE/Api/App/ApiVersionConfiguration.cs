using Asp.Versioning;

namespace Api.App;

/// <summary>
/// 
/// </summary>
public static class ApiVersionConfiguration
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="services"></param>
    public static void ConfigureVersion(this IServiceCollection services)
    {
        services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1, 0);
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ApiVersionReader = new UrlSegmentApiVersionReader();
        }).AddApiExplorer(options =>
        {
            options.GroupNameFormat = "'v'VVV";
            options.SubstituteApiVersionInUrl = true;
        });
    }
}