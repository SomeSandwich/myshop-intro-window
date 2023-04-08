using Api.App;
using API.App;
using Api.App.Extensions;
using Asp.Versioning.Builder;
using Asp.Versioning.Conventions;

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
    app.UseSwaggerUI(options =>
    {
        var descs = app.DescribeApiVersions();
        foreach (var desc in descs)
        {
            var url = $"/swagger/{desc.GroupName}/swagger.json";
            var name = desc.GroupName.ToUpperInvariant();
            options.SwaggerEndpoint(url, name);
        }

        // options.RoutePrefix = string.Empty;
    });
}

// app.ConfigureErrorResponse();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();