using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;

namespace Api.Types.Objects;

#region Request

public class CreateAccountReq
{
    /// <summary>
    /// Username of new account
    /// </summary>
    /// <example>lybonghoa</example>
    [Required]
    [StringLength(20)]
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Password of new account
    /// </summary>
    /// <example>SomesandWich!0987</example>
    [Required]
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// Email of new account
    /// </summary>
    /// <example>hieucckha@gmail.com</example>
    [Required]
    [StringLength(50)]
    public string Email { get; set; } = string.Empty;
}

public class UpdateInfoAccReq
{
    /// <summary>
    /// New email
    /// </summary>
    /// <example>example@example.com</example>
    [StringLength(50)]
    public string? Email { get; set; } = string.Empty;
}

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

#endregion

#region Response

public class AccountRes
{
    /// <summary>
    /// Unique Account Id
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }

    /// <summary>
    /// Username of this account
    /// </summary>
    /// <example>root</example>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Email of this account
    /// </summary>
    /// <example>admin@admin.com</example>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Unique Account Id
    /// </summary>
    /// <example>Activate</example>
    public AccountStatus Status { get; set; }
}

#endregion