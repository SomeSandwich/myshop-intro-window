using Api.Services;
using Api.Types.GlobalTypes;
using Api.Types.Objects;
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

    /// <summary>
    /// Get All Accounts
    /// </summary>
    /// <returns>The list of all accounts</returns>
    [HttpGet]
    [Route("")]
    [SwaggerOperation(
        Summary = "Get All Accounts",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "The list of all accounts", typeof(IEnumerable<AccountRes>))]
    public async Task<ActionResult<IEnumerable<AccountRes>>> GetAll()
    {
        var listAcc = await _accSer.GetAsync();

        return Ok(listAcc);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<ActionResult<AccountRes>> GetOne([FromRoute] int id)
    {
        var acc = await _accSer.GetAsync(id);

        return Ok(acc);
    }

    [HttpPost]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<string>> Create([FromBody] CreateAccountReq req)
    {
        var acc = await _accSer.CreateAsync(req);

        return CreatedAtAction(nameof(GetOne), new { id = acc }, new ResSuccess());
    }

    [HttpPatch]
    [Route("info")]
    public async Task<ActionResult> UpdateAsync([FromBody] UpdateInfoAccReq req)
    {
        var abc = await _accSer.UpdateInfoAccAsync(req);

        return Ok(new ResSuccess());
    }

    [HttpPatch]
    [Route("password")]
    public async Task<ActionResult> UpdatePasswordAsync([FromBody] UpdatePasswordReq req)
    {
        return Ok(new ResSuccess());
    }
}