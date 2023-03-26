using Asp.Versioning.Builder;

namespace Api.App.Extensions;

public interface IModule
{
    IServiceCollection RegisterModule(IServiceCollection builder);
    IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version);
}

public static class ModuleExtensions
{
    // this could also be added into the DI container
    private static readonly List<IModule> RegisteredModules = new List<IModule>();
    public static IServiceCollection RegisterModules(this IServiceCollection services)
    {
        var modules = DiscoverModules();
        foreach (var module in modules)
        {
            module.RegisterModule(services);
            RegisteredModules.Add(module);
        }
        return services;
    }
    public static WebApplication MapEndpoints(this WebApplication app, ApiVersionSet version)
    {
        foreach (var module in RegisteredModules)
        {
            module.MapEndpoints(app, version);
        }
        return app;
    }
    private static IEnumerable<IModule> DiscoverModules()
    {
        return typeof(IModule).Assembly
            .GetTypes()
            .Where(p => p.IsClass && p.IsAssignableTo(typeof(IModule)))
            .Select(Activator.CreateInstance)
            .Cast<IModule>();
    }
}