using System.ComponentModel;
using Api.Context.Constants.Enums;
using Api.Context.Entities;

namespace Api.Types.Objects.Order;

public class OrderRes
{
    public int Id { get; set; }

    public int Total { get; set; } = default;

    [DefaultValue(OrderStatus.Processing)] public OrderStatus Status { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

    public int CustomerId { get; set; }

    public int SellerId { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; }
}