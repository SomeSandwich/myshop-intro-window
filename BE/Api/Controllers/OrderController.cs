using System.Runtime.CompilerServices;
using System.Security.Claims;
using Api.Context.Constants.Enums;
using Api.Services;
using Api.Types.Objects;
using API.Types.Objects;
using Api.Types.Objects.Order;
using Api.Types.Results;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using ResFailure = Api.Types.GlobalTypes.ResFailure;
using ResSuccess = Api.Types.GlobalTypes.ResSuccess;

namespace Api.Controllers;

/// <summary>
/// Order Controller
/// </summary>
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/order")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orSer;

    public OrderController(IOrderService orSer)
    {
        _orSer = orSer;
    }

    [HttpGet]
    [Route("")]
    [SwaggerOperation(
        Summary = "Get All Order",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "List information order", typeof(IEnumerable<OrderRes>))]
    public async Task<ActionResult<IEnumerable<OrderRes>>> GetFilter([FromQuery] OrderFilter page)
    {
        if (page.DateFrom.CompareTo(page.DateTo) < 0)
            return BadRequest(new ResFailure { Message = "DateFrom is earlier than DateTo" });

        var list = await _orSer.GetAsync(page);

        return Ok(list);
    }

    [HttpGet]
    [Route("customer/{userId:int}")]
    [SwaggerOperation(
        Summary = "Get By User Id",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "List information order by userId", typeof(IEnumerable<OrderRes>))]
    public async Task<ActionResult<IEnumerable<OrderRes>>> GetByUserId([FromRoute] int userId)
    {
        return Ok();
    }


    [HttpGet]
    [Route("order/{id:int}")]
    [SwaggerOperation(
        Summary = "Get Order By Id",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "Order information", typeof(OrderRes))]
    public async Task<ActionResult<OrderRes>> GetOne([FromRoute] int id)
    {
        var order = await _orSer.GetAsync(id);

        if (order is null)
            return BadRequest(new ResFailure { Message = $"Not found orderId:{id}" });

        return Ok(order);
    }

    [HttpPost]
    [Route("")]
    [SwaggerOperation(
        Summary = "Create a order",
        Description = "",
        OperationId = "Post")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<string>> Create([FromBody] CreateOrderReq req)
    {
        var selfIdStr = User.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Name)?.Value;
        if (selfIdStr is null)
            return Unauthorized();

        if (!int.TryParse(selfIdStr, out var sellerId))
            return Unauthorized();

        var orderId = await _orSer.CreateAsync(sellerId, req);

        return CreatedAtAction(
            nameof(GetOne),
            new { id = orderId },
            new ResSuccess());
    }

    [HttpPatch]
    [Route("{id:int}")]
    public async Task<ActionResult> Update([FromRoute] int id, [FromBody] UpdateOrderReq req)
    {
        if (req.Status == OrderStatus.Deleted)
            return BadRequest(new ResFailure { Message = "Incorrect status" });

        var result = await _orSer.UpdateAsync(id, req);

        if (result is FailureResult)
            return BadRequest(new ResFailure { Message = result.Message });

        return Ok();
    }
}