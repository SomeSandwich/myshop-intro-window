using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;

namespace Api.Types.Objects;

public class AccountRes
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public AccountStatus Status { get; set; }
}

public class CreateAccountReq
{
    [StringLength(20)] public string Username { get; set; } = string.Empty;

    [StringLength(60)] public string Password { get; set; } = string.Empty;

    [StringLength(50)] public string Email { get; set; } = string.Empty;
}

public class UpdateAccountReq
{
    [StringLength(20)] public string? Username { get; set; } = string.Empty;

    [StringLength(50)] public string? Email { get; set; } = string.Empty;
}

public class UpdatePasswordReq
{
    [StringLength(60)] public string OldPassword { get; set; } = string.Empty;

    [StringLength(60)] public string NewPassword { get; set; } = string.Empty;
    
    [StringLength(60)] public string ConfirmPassword { get; set; } = string.Empty;
}