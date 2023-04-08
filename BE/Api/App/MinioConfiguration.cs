using Minio.AspNetCore;

namespace API.App;

public static class MinioConfiguration
{
    public static void ConfigureMinio(this IServiceCollection services, IConfiguration config,
        IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            services.AddMinio(opt =>
            {
                opt.Endpoint = config["Minio:Endpoint"] ??
                               throw new InvalidOperationException("Not Found Minio:Endpoint In Configuration File");
                opt.AccessKey = config["Minio:AccessKey"] ??
                                throw new InvalidOperationException("Not Found Minio:AccessKey In Configuration File");
                opt.SecretKey = config["Minio:SecretKey"] ??
                                throw new InvalidOperationException("Not Found Minio:SecretKey In Configuration File");

                // TODO: Make server with SSL
                opt.ConfigureClient(client => { client.WithSSL(true); });
            });
        }
        else
        {
            services.AddMinio(opt =>
            {
                opt.Endpoint = Environment.GetEnvironmentVariable("MINIO_ENDPOINT")
                               ?? config["Minio:Endpoint"] ??
                               throw new InvalidOperationException("Not Found Minio:Endpoint In Configuration File");
                opt.AccessKey = Environment.GetEnvironmentVariable("MINIO_ACCESSKEY")
                                ?? config["Minio:AccessKey"] ??
                                throw new InvalidOperationException("Not Found Minio:AccessKey In Configuration File");
                opt.SecretKey = Environment.GetEnvironmentVariable("MINIO_SECRETKEY")
                                ?? config["Minio:SecretKey"] ??
                                throw new InvalidOperationException("Not Found Minio:SecretKey In Configuration File");

                // TODO: Make server with SSL
                opt.ConfigureClient(client => { client.WithSSL(true); });
            });
        }
    }
}
