namespace API.Types.Objects.OrderDetail;

public class OrderDetailRes
{
    /// <summary>
    /// Product ID
    /// </summary>
    public int ProductId { get; set; }

    /// <summary>
    /// Cost
    /// </summary>
    public int Cost { get; set; } = default;

    /// <summary>
    /// Unit price of product
    /// </summary>
    public int UnitPrice { get; set; } = default;

    /// <summary>
    /// Discount  of product
    /// </summary>
    public int Discount { get; set; } = default;

    /// <summary>
    /// Quantity of product
    /// </summary>
    public int Quantity { get; set; } = default;
}