using Api.Context.Constants.Enums;
using Api.Context.Entities;

namespace Api.Types.Objects.Order;

public class UpdateOrderReq
{
    public OrderStatus Status { get; set; }
}