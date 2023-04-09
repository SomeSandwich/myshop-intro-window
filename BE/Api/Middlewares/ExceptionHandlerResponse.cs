using Microsoft.AspNetCore.Diagnostics;

namespace MMS.GateApi.Middlewares;

public static class ExceptionHandlerResponse
{
    public static void ConfigureErrorResponse(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(c => c.Run(async context =>
        {
            var exception = context.Features
                .Get<IExceptionHandlerPathFeature>()!
                .Error;

            await context.Response.WriteAsJsonAsync(new { Message = exception.Message, });
        }));
    }
}