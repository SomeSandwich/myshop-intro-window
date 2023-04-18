using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects;

public class UpdateInfoAccReq
{
    /// <summary>
    /// New email
    /// </summary>
    /// <example>example@example.com</example>
    [StringLength(50)]
    public string? Email { get; set; } = string.Empty;
}