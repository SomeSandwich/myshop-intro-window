using Api.Services;

namespace Api.App;

public static class ServiceRegister
{
    public static void RegisterServices(this IServiceCollection builder)
    {
        builder.AddScoped<IAccountService, AccountService>();
        builder.AddScoped<ICategoryService, CategoryService>();
        builder.AddScoped<ICustomerService, CustomerService>();
        builder.AddScoped<IOrderService, OrderService>();
        builder.AddScoped<IProductService, ProductService>();
    }
}