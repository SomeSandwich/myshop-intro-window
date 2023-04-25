using System.Security.Claims;
using Api.Services;
using Api.Types.GlobalTypes;
using Api.Types.Objects;
using Api.Types.Results;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/account")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accSer;

    public AccountController(IAccountService accSer)
    {
        _accSer = accSer;
    }

    [HttpGet]
    [Route("")]
    [SwaggerOperation(
        Summary = "Get All Accounts",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "List information account", typeof(IEnumerable<AccountRes>))]
    public async Task<ActionResult<IEnumerable<AccountRes>>> GetAll()
    {
        var listAcc = await _accSer.GetAsync();

        return Ok(listAcc);
    }

    [HttpGet]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Get Account By Id",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "Account information", typeof(AccountRes))]
    public async Task<ActionResult<AccountRes>> GetById([FromRoute] int id)
    {
        var acc = await _accSer.GetAsync(id);

        return Ok(acc);
    }

    [HttpPost]
    [Route("")]
    [SwaggerOperation(
        Summary = "Create Account",
        Description = "",
        OperationId = "Get")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<ResSuccess>> Create([FromBody] CreateAccountReq req)
    {
        if (await _accSer.ExistUnameOrEmail(req.Username, req.Email))
            return BadRequest(new FailureResult
            {
                Message = "Username or email is exist. Please using another"
            });

        var acc = await _accSer.CreateAsync(req);

        return CreatedAtAction(nameof(GetById), new { id = acc }, new ResSuccess());
    }

    [HttpPatch]
    [Route("info/self")]
    [SwaggerOperation(
        Summary = "Update Self Account Information",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "Success Response", typeof(ResSuccess))]
    [SwaggerResponse(400, "Not found userId", typeof(ResFailure))]
    [SwaggerResponse(401, "Not login", typeof(ResFailure))]
    public async Task<ActionResult<ResSuccess>> UpdateSelfInfo([FromBody] UpdateInfoAccReq req)
    {
        if (HttpContext.User.Identity is not ClaimsIdentity identity)
            return Unauthorized();

        var selfIdStr = identity.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Name)?.Value;
        if (selfIdStr is null)
            return Unauthorized();

        if (!int.TryParse(selfIdStr, out var accId))
        {
            return Unauthorized();
        }

        var result = await _accSer.UpdateInfoAccAsync(accId, req);
        if (result.Status == StatusReturn.Failure)
            return BadRequest(new ResFailure
            {
                Message = result.Message,
            });

        return Ok(new ResSuccess());
    }

    [HttpPatch]
    [Route("password/self")]
    [SwaggerOperation(
        Summary = "Update Self Account Password",
        Description = "",
        OperationId = "HttpPatch")]
    [SwaggerResponse(200, "abc", typeof(ResSuccess))]
    [SwaggerResponse(400,
        $"Not Found Account | The Old Password is wrong | The password not equal to confirm password | Password is null empty",
        typeof(ResFailure))]
    [SwaggerResponse(401, "Not login", typeof(ResFailure))]
    public async Task<ActionResult<ResSuccess>> UpdateSelfPassword([FromBody] SelfUpdatePasswordReq req)
    {
        if (HttpContext.User.Identity is not ClaimsIdentity identity)
            return Unauthorized();

        var selfIdStr = identity.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Name)?.Value;
        if (selfIdStr is null)
            return Unauthorized();

        if (!int.TryParse(selfIdStr, out var accId))
        {
            return Unauthorized();
        }

        if (req.NewPassword != req.ConfirmPassword)
            return BadRequest(new ResFailure
            {
                Message = "The password not equal to confirm password"
            });

        var result = await _accSer.UpdateSelfPasswordAsync(accId, req);
        if (result.Status == StatusReturn.Failure)
            return BadRequest(new ResFailure
            {
                Message = result.Message
            });

        return Ok(new ResSuccess());
    }
}