using Api.Services;
using Api.Types.GlobalTypes;
using Api.Types.Objects;
using Api.Types.Results;
using Asp.Versioning;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Controllers;

/// <summary>
/// Customer Controller
/// </summary>
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/customer")]
public class CustomerController:ControllerBase
{
    private readonly ICustomerService _cusSer;

    public CustomerController(ICustomerService cusSer)
    {
        _cusSer = cusSer;
    }

    [HttpGet]
    [Route("")]
    [SwaggerOperation(
        Summary = "Get All Customers",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "List information of customers", typeof(IEnumerable<CustomerRes>))]
    public async Task<ActionResult<IEnumerable<CustomerRes>>> GetAll()
    {
        var list = await _cusSer.GetAsync();

        return Ok(list);
    }

    [HttpGet]
    [Route("{id;int}")]
    [SwaggerOperation(
        Summary = "Get Product By Id",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "Customer information", typeof(CustomerRes))]
    [SwaggerResponse(400, "Not found customerId", typeof(ResFailure))]
    public async Task<ActionResult<ProductRes>> GetOne([FromRoute] int id)
    {
        var customer = await _cusSer.GetAsync(id);
        if (customer is null)
            return BadRequest(new ResFailure { Message = $"Not found customerId: {id}" });

        return Ok(customer);
    }
    
    [HttpPost]
    [Route("")]
    [SwaggerOperation(
        Summary = "Create Customer",
        Description = "",
        OperationId = "Post")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<string>> Create([FromBody] CreateCustomerReq req)
    {
        var customerId = await _cusSer.CreateAsync(req);

        return CreatedAtAction(nameof(GetOne), new { id = $"{customerId}" }, new ResSuccess());
    }

    [HttpPatch]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Update Customer",
        Description = "",
        OperationId = "Patch")]
    [SwaggerResponse(200, "Success Response", typeof(ResSuccess))]
    public async Task<ActionResult<ResBase>> UpdateCustomer([FromRoute] int id, [FromBody]UpdateCustomerReq req)
    {
        var result = await _cusSer.UpdateAsync(id, req);
        if (result is FailureResult)
            return BadRequest(new ResFailure { Message = result.Message });
        
        return Ok(new ResSuccess());
    }
    
    [HttpDelete]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Delete Customer",
        Description = "",
        OperationId = "Delete")]
    [SwaggerResponse(200, "Success Response", typeof(ResSuccess))]
    [SwaggerResponse(400, "Not found customerId", typeof(ResFailure))]
    public async Task<ActionResult<ResBase>> DeleteProduct([FromRoute] int id)
    {
        var result = await _cusSer.DeleteAsync(id);

        if (result is not SuccessResult)
            return BadRequest(new ResFailure { Message = result.Message });

        return Ok(result);
    }
}