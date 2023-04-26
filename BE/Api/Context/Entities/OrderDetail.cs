using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Context.Entities;

public class OrderDetail
{
    // [Key]
    // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    // public int Id { get; set; }

    /// <summary>
    /// Order ID
    /// </summary>
    [ForeignKey("Order")]
    public int OrderId { get; set; }

    public virtual Order Order { get; set; }

    /// <summary>
    /// Product ID
    /// </summary>
    [ForeignKey("Product")]
    public int ProductId { get; set; }

    public virtual Product Product { get; set; }

    /// <summary>
    /// Cost
    /// </summary>
    public int Cost { get; set; } = default;

    /// <summary>
    /// Unit price of product
    /// </summary>
    public int UnitPrice { get; set; } = default;

    /// <summary>
    /// Discount  of product
    /// </summary>
    public int Discount { get; set; } = default;

    /// <summary>
    /// Quantity of product
    /// </summary>
    public int Quantity { get; set; } = default;
}

public class OrderDetailConfiguration : IEntityTypeConfiguration<OrderDetail>
{
    public void Configure(EntityTypeBuilder<OrderDetail> builder)
    {
        builder.HasKey(e => new { e.OrderId, e.ProductId });
    }
}