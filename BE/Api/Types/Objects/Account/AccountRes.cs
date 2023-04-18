using Api.Context.Constants.Enums;

namespace Api.Types.Objects;

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