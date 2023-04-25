using Api.Context;
using Microsoft.EntityFrameworkCore;

namespace Api.App;

public static class DbConfiguration
{
    public static void ConfigureDatabase(this IServiceCollection services, IConfiguration config,
        IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            services.AddDbContext<MyShopDbContext>(options =>
            {
                options.UseNpgsql(config["ConnectionStrings:Url"]);
                options.EnableDetailedErrors();
                options.EnableSensitiveDataLogging();
            });
        }
        else
        {
            services.AddDbContext<MyShopDbContext>(options =>
            {
                options.UseNpgsql(Environment.GetEnvironmentVariable("DB_CONNECTIONSTR"));
            });
        }
    }
}