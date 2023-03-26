using Microsoft.EntityFrameworkCore;

namespace Api.Context;

public class MyShopDbContext : DbContext
{
    public MyShopDbContext(DbContextOptions<MyShopDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
    }

    #region Entities
    

    #endregion
}