using Api.Services;
using API.Services;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace Api.App;

public static class ServiceRegister
{
    public static void RegisterServices(this IServiceCollection builder)
    {
        builder.AddScoped<IAuthService, AuthService>();
        builder.AddScoped<IAccountService, AccountService>();
        builder.AddScoped<ICategoryService, CategoryService>();
        builder.AddScoped<ICustomerService, CustomerService>();
        builder.AddScoped<IOrderService, OrderService>();
        builder.AddScoped<IProductService, ProductService>();
        builder.AddScoped<IMinioFileService, MinioFileService>();
        builder.AddScoped<IOrderDetailService, OrderDetailService>();
        builder.AddScoped<IImportService, ImportService>();

        builder.AddSingleton<IUriService>(o =>
        {
            var accessor = o.GetRequiredService<IHttpContextAccessor>();
            var request = accessor.HttpContext.Request;
            var uri = string.Concat(request.Scheme, "://", request.Host.ToUriComponent());
            return new UriService(uri);
        });
    }
}