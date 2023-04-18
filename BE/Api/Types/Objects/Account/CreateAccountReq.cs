using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects;

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