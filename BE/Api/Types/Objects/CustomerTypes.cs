using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects;

public class CustomerRes
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;
}

public class CreateCustomerReq
{
    [StringLength(50)] public string Name { get; set; } = string.Empty;

    [StringLength(11)] public string PhoneNumber { get; set; } = string.Empty;
}

public class UpdateCustomerReq
{
    [StringLength(50)] public string? Name { get; set; } = string.Empty;

    [StringLength(11)] public string? PhoneNumber { get; set; } = string.Empty;
}