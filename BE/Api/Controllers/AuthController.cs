using Api.Services;
using Api.Types.Mapping;
using Api.Types.Objects;
using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Tags("Authentication")]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    private readonly IMapper _mapper;

    public AuthController(IAuthService authService)
    {
        _authService = authService;

        var config = new MapperConfiguration(opt => { opt.AddProfile<AuthProfile>(); });
        _mapper = config.CreateMapper();
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<LoginRes>> Login([FromBody] LoginReq req)
    {
        var account = await _authService.LoginAsync(req);
        var remoteIpAddress = HttpContext.Request.HttpContext.Connection.RemoteIpAddress;
        var ipv4 = "";
        if (remoteIpAddress != null) ipv4 = remoteIpAddress.MapToIPv4().ToString();

        var result = await _authService.GenerateTokenAsync(account, ipv4);
        return Ok(result);
    }

    [HttpPost]
    [Route("refresh-token")]
    public async Task<ActionResult<LoginRes>> RefreshToken(
        // IConfiguration configuration, HttpRequest request,
        string tokenExpired)
    {
        try
        {
            var remoteIpAddress = HttpContext.Request.HttpContext.Connection.RemoteIpAddress;
            string ipv4 = "";
            if (remoteIpAddress != null) ipv4 = remoteIpAddress.MapToIPv4().ToString();
            var result = await _authService.RefreshTokenAsync(tokenExpired, ipv4);
            return Ok(result);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}