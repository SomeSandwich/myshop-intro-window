using System.Security.Claims;
using System.Text;
using Api.Context.Constants.Enums;
using Api.Services;
using API.Types.Objects.Filter;
using Api.Types.Objects.Order;
using API.Types.Objects.Statistic;
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
    private readonly IProductService _prodSer;

    public OrderController(IProductService prodSer, IOrderService orSer)
    {
        _orSer = orSer;
        _prodSer = prodSer;
    }

    [HttpGet]
    [Route("")]
    [SwaggerOperation(
        Summary = "Get All Order",
        Description = "",
        OperationId = "Get")]
    // [SwaggerResponse(200, "List information order", typeof(IEnumerable<OrderRes>))]
    public async Task<ActionResult<PagedResponse<OrderRes>>> GetFilter([FromQuery] OrderPagingFilter page)
    {
        if (page.DateFrom is not null && page.DateTo is not null)
            if (page.DateFrom > page.DateTo)
                return BadRequest(new ResFailure { Message = "DateFrom is earlier than DateTo" });

        var list = await _orSer.GetAsync(page);

        return Ok(list);
    }

    [HttpGet]
    [Route("customer/{customerId:int}")]
    [SwaggerOperation(
        Summary = "Get By Customer Id",
        Description = "",
        OperationId = "Get")]
    // [SwaggerResponse(200, "List information order by userId", typeof(IEnumerable<OrderRes>))]
   

    [HttpGet]
    [Route("order/{id:int}")]
    // [SwaggerResponse(200, "Order information", typeof(OrderRes))]
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
    // [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<string>> Create([FromBody] CreateOrderReq req)
    {
        var selfIdStr = User.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Name)?.Value;
        if (selfIdStr is null)
            return Unauthorized();

        if (!int.TryParse(selfIdStr, out var sellerId))
            return Unauthorized();

        var listNotExists = new List<string>();
        foreach (var orderDetail in req.OrderDetails)
        {
            var check = await _prodSer.CheckProductExists(orderDetail.ProductId);
            if (!check) listNotExists.Add(orderDetail.ProductId.ToString());
        }

        if (listNotExists.Any())
        {
            var ls = new StringBuilder();
            foreach (var pId in listNotExists)
            {
                ls.Append($" - {pId}");
            }

            return BadRequest(new ResFailure { Message = $"Product not found:{ls}" });
        }

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

    [HttpGet]
    [Route("statistic/category")]
    public async Task<ActionResult<StatByCateRes>> GetStatisticByCategory([FromRoute] StatByCateQuery query)
    {
        var result = await _orSer.GetStatisticByCate(query);
        return Ok(result);
    }
}