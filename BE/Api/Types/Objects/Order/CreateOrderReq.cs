using Api.Context.Entities;

namespace Api.Types.Objects.Order;

public class CreateOrderReq
{
    public int Total { get; set; } = default;

    public int CustomerId { get; set; }

    public int SellerId { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; }
}