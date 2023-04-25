using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Api.App;

public static class ControllerConfiguration
{
    public static void ConfigureController(this IServiceCollection services)
    {
        services.AddControllers(opt => { opt.Filters.Add(new ProducesAttribute("application/json")); })
            .AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                opt.JsonSerializerOptions.WriteIndented = true;
            });
    }
}