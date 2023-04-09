using System.Reflection;

namespace Api.App;

public static class SwaggerRedocUsing
{
    public static void UseSwaggerAndRedoc(this WebApplication app)
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
            opt.DocumentTitle = "MyShop API";
            opt.SpecUrl = "../swagger/v1/swagger.json";

            Console.WriteLine($"""
                *********
                    Stream is null: {(Assembly.GetExecutingAssembly()
                        .GetManifestResourceStream(@"Api.App.Redoc.CustomIndex.ReDoc.index.html")) is null}
                *********
            """);

            opt.IndexStream = () =>
                Assembly.GetExecutingAssembly()
                    .GetManifestResourceStream(@"Api.App.Redoc.CustomIndex.ReDoc.index.html");
        });
    }
}