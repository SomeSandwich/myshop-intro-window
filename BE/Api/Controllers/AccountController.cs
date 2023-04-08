using Api.Services;
using Api.Types.GlobalTypes;
using Api.Types.Objects;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<ActionResult<string>> Create([FromBody] CreateAccountReq req)
    {
        var acc = await _accSer.CreateAsync(req);

        return CreatedAtAction(nameof(GetOne), new { id = acc }, new ResSuccess());
    }

    [HttpPatch]
    [Route("info")]
    public async Task<ActionResult> UpdateAsync([FromBody] UpdateAccountReq req)
    {
        return Ok(new ResSuccess());
    }

    [HttpPatch]
    [Route("password")]
    public async Task<ActionResult> UpdatePasswordAsync([FromBody] UpdatePasswordReq req)
    {
        return Ok(new ResSuccess());
    }
}