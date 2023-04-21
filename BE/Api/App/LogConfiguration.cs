using Serilog;
using Serilog.Exceptions;

namespace Api.App;

public static class LogConfiguration
{
    public static void ConfigureLogger(this ILoggingBuilder builder, IConfiguration config, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(config)
                .Enrich.FromLogContext()
                .Enrich.WithExceptionDetails()
                .Enrich.WithMachineName()
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
                .Enrich.WithExceptionDetails()
                .Enrich.WithMachineName()
                .WriteTo.Seq("http://139.59.248.73:5342")
                .CreateLogger();

            builder.ClearProviders();
            builder.AddSerilog(logger);
        }
    }
}