using System.ComponentModel.DataAnnotations;
using API.Types.Objects.OrderDetail;

namespace Api.Types.Objects.Order;

public class CreateOrderReq
{
    /// <summary>
    /// Total cost of order
    /// </summary>
    /// <example>100000</example>
    [Required]
    public int TotalCost { get; set; }

    /// <summary>
    /// Total price of order
    /// </summary>
    [Required]
    public int TotalPrice { get; set; }

    /// <summary>
    /// Customer id
    /// </summary>
    /// <example>1</example>
    public int? CustomerId { get; set; }

    /// <summary>
    /// List of order detail
    /// </summary>
    [Required]
    public List<CreateOrderDetailReq> OrderDetails { get; set; }
}