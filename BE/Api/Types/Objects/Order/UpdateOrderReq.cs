using Api.Context.Entities;

namespace Api.Types.Objects.Order;

public class UpdateOrderReq
{
    public int Total { get; set; }

    public int? CustomerId { get; set; }

    public ICollection<OrderDetail> OrderDetails { get; set; }
}