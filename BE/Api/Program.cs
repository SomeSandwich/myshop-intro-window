using Api.App;
using API.App;
using Api.App.Extensions;
using MMS.GateApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
var env = builder.Environment;

builder.Services.ConfigureDatabase(config, env);
builder.Services.ConfigureMinio(config, env);
builder.Services.ConfigureVersion();
builder.Services.ConfigureSwagger();
builder.Services.ConfigureJwt(config);
builder.Services.ConfigureController();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.RegisterServices();
builder.Services.RegisterModules();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// var versionSet = app.NewApiVersionSet()
//     .HasApiVersion(1)
//     .HasApiVersion(2)
//     .ReportApiVersions()
//     .Build();

// app.MapEndpoints(versionSet);

app.ConfigureErrorResponse();

app.UseSwaggerAndRedoc();
app.UseAuthorization();
app.UseHttpsRedirection();

app.MapControllers();

app.Run();