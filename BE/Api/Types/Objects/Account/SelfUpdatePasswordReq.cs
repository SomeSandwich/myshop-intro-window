using Microsoft.Build.Framework;

namespace Api.Types.Objects;

public class SelfUpdatePasswordReq
{
    /// <summary>
    /// Old password of account
    /// </summary>
    /// <example>123</example>
    [Required]
    public string OldPassword { get; set; } = string.Empty;

    /// <summary>
    /// New password of account
    /// </summary>
    /// <example>1234</example>
    [Required]
    public string NewPassword { get; set; } = string.Empty;

    /// <summary>
    /// Retype of New password 
    /// </summary>
    /// <example>1234</example>
    [Required]
    public string ConfirmPassword { get; set; } = string.Empty;
}