namespace Api.Types.Objects.Order;

public class UpdateOrderReq
{
    public int Total { get; set; } = default;

    public int CustomerId { get; set; }

    public int SellerId { get; set; }
}