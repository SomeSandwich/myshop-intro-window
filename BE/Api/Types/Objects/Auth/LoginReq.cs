using Microsoft.Build.Framework;

namespace Api.Types.Objects;

public class LoginReq
{
    [Required] public string Username { get; set; }

    [Required] public string Password { get; set; }
}