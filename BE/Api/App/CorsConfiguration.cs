namespace API.Configurations;

public static class CorsConfiguration
{
    public static void ConfigCors(this IServiceCollection services)
    {
        // var origins = new string[]
        // {
        // };
        services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
        {
            builder
                // .WithOrigins(origins)
                // .SetIsOriginAllowed(_ => true)
                // .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }));
    }
}