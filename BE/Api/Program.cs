using Api.App;
using API.App;
using Api.App.Extensions;
using API.Configurations;
using Api.Context;
using AutoMapper.EquivalencyExpression;
using MMS.GateApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
var env = builder.Environment;

// Using Services 
builder.Services.ConfigureDatabase(config, env);
builder.Services.ConfigureMinio(config, env);
builder.Services.ConfigureVersion();
builder.Services.ConfigureSwagger();
builder.Services.ConfigureJwt(config);
builder.Services.ConfigureController();
builder.Services.ConfigCors();

builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(opt =>
{
    opt.AddMaps(AppDomain.CurrentDomain.GetAssemblies());
    opt.AddCollectionMappers();
});

builder.Services.RegisterServices();
builder.Services.RegisterModules();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Logging.ConfigureLogger(config, env);

// Using Middleware
var app = builder.Build();

app.ConfigureErrorResponse();
app.UseSwaggerAndRedoc();
app.UseAuthorization();
app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.MapControllers();
app.Run();
