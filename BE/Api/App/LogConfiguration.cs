using Serilog;
using Serilog.Configuration;

namespace Api.App;

public static class LogConfiguration
{
    public static LoggerConfiguration abc = new LoggerConfiguration();

    public static void ConfiguraLogger(this ILoggingBuilder builder, IConfiguration config, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(config)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            builder.ClearProviders();
            builder.AddSerilog(logger);
        }
        else
        {
            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(config)
                .Enrich.FromLogContext()
                .WriteTo.Seq("http://139.59.248.73:5342")
                .CreateLogger();

            builder.ClearProviders();
            builder.AddSerilog(logger);
        }
    }
}