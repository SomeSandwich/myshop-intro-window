using Microsoft.Build.Framework;

namespace API.Types.Objects.OrderDetail;

public class CreateOrderDetailReq
{
    /// <summary>
    /// Identity of product
    /// </summary>
    /// <example>1</example>
    [Required] public int ProductId { get; set; }
    
    /// <summary>
    /// Unit price of product
    /// </summary>
    /// <example>10000</example>
    [Required] public int UnitPrice { get; set; }
    
    /// <summary>
    /// Discount of product
    /// </summary>
    /// <example>10</example>
    [Required] public int Discount { get; set; }

    /// <summary>
    /// Quantity of product
    /// </summary>
    /// <example>2</example>
    [Required] public int Quantity { get; set; } = 1;
}