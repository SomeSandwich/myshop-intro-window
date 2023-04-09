using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects;

public class LoginReq
{
    [Required] public string Username { get; set; }

    [Required] public string Password { get; set; }
}

public class LoginRes
{
    public string Token { get; set; }
}