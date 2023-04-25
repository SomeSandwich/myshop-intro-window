using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using API.Types.Objects.OrderDetail;

namespace Api.Types.Objects.Order;

public class CreateOrderReq
{
    [Required] public int Total { get; set; }

    public int? CustomerId { get; set; }

    // [JsonIgnore] public int SellerId { get; set; }

    [Required] public List<CreateOrderDetailReq> OrderDetails { get; set; }
}