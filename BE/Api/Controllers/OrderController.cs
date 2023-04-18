using Api.Services;
using Api.Types.GlobalTypes;
using Api.Types.Objects;
using Api.Types.Objects.Order;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
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
    public async Task<ActionResult<IEnumerable<OrderRes>>> GetAsync()
    {
        var list = await _orSer.GetAsync();

        return Ok(list);
    }

    [HttpGet]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Get Order By Id",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "Order information", typeof(OrderRes))]
    public async Task<ActionResult<OrderRes>> GetAsync([FromRoute] int id)
    {
        var order = await _orSer.GetAsync(id);

        if (order is null)
            return BadRequest(new ResFailure { Message = $"Not found orderId:{id}" });

        return Ok(order);
    }
    
    // [HttpPost]
    // [Route("")]
    // [SwaggerOperation(
    //     Summary = "Create a order",
    //     Description = "",
    //     OperationId = "Post")]
    // [ProducesResponseType(StatusCodes.Status201Created)]
    // public async Task<ActionResult<string>> Create()
}