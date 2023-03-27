using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Context.Entities;

public class OrderDetail
{
    [ForeignKey("Order")] public int OrderId { get; set; }
    public virtual Order Order { get; set; }

    [ForeignKey("Product")] public int ProductId { get; set; }
    public virtual Product Product { get; set; }

    public int UnitPrice { get; set; } = default;

    public int Discount { get; set; } = default;
}

public class OrderDetailConfiguration : IEntityTypeConfiguration<OrderDetail>
{
    public void Configure(EntityTypeBuilder<OrderDetail> builder)
    {
        builder.HasKey(e => new { e.OrderId, e.ProductId });
    }
}