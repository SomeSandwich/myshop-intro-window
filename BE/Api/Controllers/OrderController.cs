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
    private readonly ICustomerService _customerService;

    public OrderController(IProductService prodSer, IOrderService orSer, ICustomerService customerService)
    {
        _orSer = orSer;
        _prodSer = prodSer;
        _customerService = customerService;
    }

    [HttpGet]
    [Route("all")]
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
    public async Task<ActionResult<IEnumerable<OrderRes>>> GetByCustomerId([FromRoute] int customerId)
    {
        var checkCustomer = await _customerService.CheckCustomerExists(customerId);
        if (checkCustomer == false)
            return BadRequest(new ResFailure { Message = $"Not found Customer with Id: {customerId}" });
        
        var result = await _orSer.GetByCustomerAsync(customerId);
        return Ok(result);
    }

    [HttpGet]
    [Route("{orderId:int}")]
    public async Task<ActionResult<OrderRes>> GetOne([FromRoute] int orderId)
    {
        var order = await _orSer.GetAsync(orderId);

        if (order is null)
            return BadRequest(new ResFailure { Message = $"Not found orderId:{orderId}" });

        return Ok(order);
    }

    [HttpPost]
    [Route("")]
    [SwaggerOperation(
        Summary = "Create a order",
        Description = "",
        OperationId = "Post")]
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

        return Ok(new ResSuccess());
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
        var result = await _orSer.DeleteAsync(id);

        if (result is FailureResult)
            return BadRequest(new ResFailure { Message = result.Message });

        return Ok(new ResSuccess());
    }

    [HttpGet]
    [Route("statistic/category")]
    public async Task<ActionResult<StatByCateRes>> GetStatisticByCategory([FromQuery] StatByCateQuery query)
    {
        if (query.DateFrom.CompareTo(query.DateTo) > 0)
            return BadRequest(new ResFailure { Message = "Invalid input data" });

        var result = await _orSer.GetStatisticByCate(query);
        return Ok(result);
    }

    [HttpGet]
    [Route("statistic/year")]
    public async Task<ActionResult<StatByYearRes>> GetStatistisByYear([FromQuery] StatByYearQuery query)
    {
        if (query.Year < 1)
            return BadRequest(new ResFailure { Message = "Invalid input data" });

        var result = await _orSer.GetStatisticByYear(query);
        return Ok(result);
    }

    [HttpGet]
    [Route("statistic/month")]
    public async Task<ActionResult> GetStatisticByMonth([FromQuery] StatByMonthQuery query)
    {
        if (query.Year < 1 || query.Month < 1 || query.Month > 12)
            return BadRequest(new ResFailure { Message = "Invalid input data" });

        var result = await _orSer.GetStatisticByMonth(query);
        return Ok(result);
    }

    [HttpGet]
    [Route("statistic/week")]
    public async Task<ActionResult> GetStatisticByWeek([FromQuery] StatByWeekQuery query)
    {
        if (query.Year < 1 || query.Week < 1 || query.Week > 52)
            return BadRequest(new ResFailure { Message = "Invalid input data" });

        var result = await _orSer.GetStatisticByWeek(query);
        return Ok(result);
    }

    [HttpGet]
    [Route("statistic/date")]
    public async Task<ActionResult> GetStatisticByDate([FromQuery] StatByDateQuery query)
    {
        if (query.DateFrom.CompareTo(query.DateTo) > 0)
            return BadRequest(new ResFailure { Message = "Invalid input data" });

        var result = await _orSer.GetStatisticByDate(query);
        return Ok(result);
    }
}