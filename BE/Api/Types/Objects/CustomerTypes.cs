using System.ComponentModel.DataAnnotations;
using Api.Context.Entities;

namespace Api.Types.Objects;



public class CreateCustomerReq
{
    /// <summary>
    /// Name of new customer
    /// </summary>
    /// <example>John</example>
    [StringLength(50)] public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Phone number of customer
    /// </summary>
    /// <example>0123456789</example>
    [StringLength(11)] public string PhoneNumber { get; set; } = string.Empty;
}

public class UpdateCustomerReq
{
    
    /// <summary>
    /// New name
    /// </summary>
    /// <example>Brown</example>
    [StringLength(50)] public string? Name { get; set; } = string.Empty;

    /// <summary>
    /// New phone number
    /// </summary>
    /// 01111111111
    [StringLength(11)] public string? PhoneNumber { get; set; } = string.Empty;
}

public class CustomerRes
{
    /// <summary>
    /// Unique Customer Id
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }

    /// <summary>
    /// Name of customer
    /// </summary>
    /// <example>John</example>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Phone number of customer
    /// </summary>
    /// <example>0123456789</example>
    public string PhoneNumber { get; set; } = string.Empty;
    
    /// <summary>
    /// Date of join
    /// </summary>
    /// <example>2022-01-01</example>
    public DateOnly JoinDate { get; set; }
    
    /// <summary>
    /// 
    /// </summary>
    public virtual ICollection<Order> Orders { get; set; }

}