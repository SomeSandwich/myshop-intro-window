using System.Reflection;
using Api.App;
using API.App;
using Api.App.Extensions;
using Asp.Versioning.Builder;
using Asp.Versioning.Conventions;
using MMS.GateApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
var env = builder.Environment;

builder.Services.ConfigureDatabase(config, env);
builder.Services.ConfigureMinio(config, env);
builder.Services.ConfigureVersion();
builder.Services.ConfigureSwagger();
builder.Services.ConfigureJwt(config);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.RegisterServices();
builder.Services.RegisterModules();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

ApiVersionSet versionSet = app.NewApiVersionSet()
    .HasApiVersion(1)
    .HasApiVersion(2)
    .ReportApiVersions()
    .Build();

app.MapEndpoints(versionSet);

if (true)
{
    app.UseSwagger();
    app.UseSwaggerUI(opt =>
    {
        var descs = app.DescribeApiVersions();
        foreach (var desc in descs)
        {
            var url = $"/swagger/{desc.GroupName}/swagger.json";
            var name = desc.GroupName.ToUpperInvariant();
            opt.SwaggerEndpoint(url, name);
        }
    });

    app.UseReDoc(opt =>
    {
        opt.DocumentTitle = "Swagger Demo Documentation";
        opt.SpecUrl = "/swagger/v1/swagger.json";

        // var resourceNames = Assembly.GetExecutingAssembly().GetManifestResourceNames();
        // Console.WriteLine("--- Resource Name ---");
        // foreach (string name in resourceNames)
        // {
        //     Console.WriteLine($"--- {name} ---");
        // }
        Console.WriteLine($"""
                *********
                Stream is null {(Assembly.GetExecutingAssembly()
                    .GetManifestResourceStream(@"Api.App.Redoc.CustomIndex.ReDoc.index.html")) is null}
                *********
            """);

        opt.IndexStream = () =>
            Assembly.GetExecutingAssembly()
                .GetManifestResourceStream(@"Api.App.Redoc.CustomIndex.ReDoc.index.html");
    });
}

app.ConfigureErrorResponse();

app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();

app.Run();