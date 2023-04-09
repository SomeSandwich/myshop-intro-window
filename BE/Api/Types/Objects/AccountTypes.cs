using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Types.Objects;

[SwaggerSchema(Required = new[] { "Id", "Username", "Email", "Status" })]
public class AccountRes
{
    [SwaggerSchema(
        Title = "Unique Account Id",
        Description = "Database Id of this account, and it will be unique",
        Format = "int")]
    public int Id { get; set; }

    [SwaggerSchema(
        Title = "Unique Account Id",
        Description = "Database Id of this account, and it will be unique",
        Format = "int")]
    public string Username { get; set; } = string.Empty;

    [SwaggerSchema(
        Title = "Unique Account Id",
        Description = "Database Id of this account, and it will be unique",
        Format = "int")]
    public string Email { get; set; } = string.Empty;

    [SwaggerSchema(
        Title = "Unique Account Id",
        Description = "Database Id of this account, and it will be unique",
        Format = "int")]
    public AccountStatus Status { get; set; }
}

public class CreateAccountReq
{
    [StringLength(20)] public string Username { get; set; } = string.Empty;

    [StringLength(60)] public string Password { get; set; } = string.Empty;

    [StringLength(50)] public string Email { get; set; } = string.Empty;
}

public class UpdateInfoAccReq
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