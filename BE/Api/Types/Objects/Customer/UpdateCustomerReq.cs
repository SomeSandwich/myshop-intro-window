using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects.Customer;

public class UpdateCustomerReq
{
    /// <summary>
    /// New name
    /// </summary>
    /// <example>Brown</example>
    [StringLength(50)]
    public string? Name { get; set; } = string.Empty;

    /// <summary>
    /// New phone number
    /// </summary>
    /// 01111111111
    [StringLength(11)]
    public string? PhoneNumber { get; set; } = string.Empty;
}