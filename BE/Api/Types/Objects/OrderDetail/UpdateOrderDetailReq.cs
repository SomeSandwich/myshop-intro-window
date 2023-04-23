using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Types.Objects.OrderDetail;

public class UpdateOrderDetailReq
{
    [JsonIgnore] public int OrderId { get; set; }

    [Required] public int ProductId { get; set; }

    public int? Discount { get; set; }

    public int? UnitPrice { get; set; }

    public int? Quantity { get; set; }
}