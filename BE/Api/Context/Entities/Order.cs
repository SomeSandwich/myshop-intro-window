using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Context.Constants.Enums;

namespace Api.Context.Entities;

public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int Total { get; set; } = default;

    [DefaultValue(OrderStatus.Processing)]
    public OrderStatus Status { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }


    [ForeignKey("Customer")] public int? CustomerId { get; set; }
    public virtual Customer Customer { get; set; }

    [ForeignKey("Seller")] public int SellerId { get; set; }
    public virtual Account Seller { get; set; }
    
    
    public virtual ICollection<OrderDetail> OrderDetails { get; set; }
}