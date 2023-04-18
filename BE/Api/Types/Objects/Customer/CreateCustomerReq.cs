using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects.Customer;

public class CreateCustomerReq
{
    /// <summary>
    /// Name of new customer
    /// </summary>
    /// <example>John</example>
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Phone number of customer
    /// </summary>
    /// <example>0123456789</example>
    [StringLength(11)]
    public string PhoneNumber { get; set; } = string.Empty;
}