using Api.Context.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Context;

public class MyShopDbContext : DbContext
{
    public MyShopDbContext(DbContextOptions<MyShopDbContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        new AccountConfiguration().Configure(builder.Entity<Account>());
        new CategoryConfiguration().Configure(builder.Entity<Category>());
        new OrderDetailConfiguration().Configure(builder.Entity<OrderDetail>());
        new CustomerConfiguration().Configure(builder.Entity<Customer>());
    }

    #region Entities

    public DbSet<Account> Accounts { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }

    #endregion
}