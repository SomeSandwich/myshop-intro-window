using System.ComponentModel;
using System.Security.Claims;
using Api.Services;
using Api.Types.GlobalTypes;
using Api.Types.Mapping;
using Api.Types.Objects;
using Api.Types.Results;
using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Controllers;

/// <summary>
/// Product Controller
/// </summary>
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/product")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productSer;
    private readonly IMapper _mapper;

    public ProductController(IProductService productSer)
    {
        _productSer = productSer;

        var config = new MapperConfiguration(opt => { opt.AddProfile<ProductProfile>(); });
        _mapper = config.CreateMapper();
    }

    [HttpGet]
    [Route("")]
    [SwaggerOperation(
        Summary = "Get All Products",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "List information product", typeof(IEnumerable<ProductRes>))]
    public async Task<ActionResult<IEnumerable<ProductRes>>> GetAll()
    {
        var list = await _productSer.GetAsync();
    
        return Ok(list);
    }
    
    [HttpGet]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Get Product By Id",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "Product information", typeof(ProductRes))]
    [SwaggerResponse(400, "Not found productId", typeof(ResFailure))]
    public async Task<ActionResult<ProductRes>> GetOne([FromRoute] int id)
    {
        var prod = await _productSer.GetAsync(id);
        if (prod is null)
            return BadRequest(new ResFailure { Message = $"Not found productId: {id}" });
    
        return Ok(prod);
    }
    
    [HttpGet]
    [Route("/category/{cateId:int}")]
    [SwaggerOperation(
        Summary = "Get Product By Category Id",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(200, "List product by category", typeof(IEnumerable<ProductRes>))]
    public async Task<ActionResult<IEnumerable<ProductRes>>> GetByCategoryId([FromRoute] int cateId)
    {
        var lsProduct = await _productSer.GetByCategoryAsync(cateId);
    
        return Ok(lsProduct);
    }

    [HttpPost]
    [Route("")]
    [SwaggerOperation(
        Summary = "Create Product",
        Description = "",
        OperationId = "Post")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<string>> Create([FromForm] CreateProductReq req)
    {
        // Todo Upload File
        var listFileUpload = new List<string>();

        var accArg = _mapper.Map<CreateProductReq, CreateProductArg>(req);
        accArg.MediaPath = listFileUpload;

        var prodId = await _productSer.CreateAsync(accArg);

        return CreatedAtAction(nameof(GetOne), new { id = $"{prodId}" }, new ResSuccess());
    }
    
    [HttpPatch]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "UpdateProduct",
        Description = "",
        OperationId = "Patch")]
    [SwaggerResponse(200, "Success Response", typeof(ResSuccess))]
    [SwaggerResponse(400, "Not found productId", typeof(ResFailure))]
    [SwaggerResponse(401, "Not login", typeof(ResFailure))]
    public async Task<ActionResult<ResBase>> UpdateProduct([FromRoute] int id, [FromForm] UpdateProductReq req)
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
    
        // todo upload file
        var listUpload = new List<string>();
        // todo delete file
    
        var arg = _mapper.Map<UpdateProductReq, UpdateProductArg>(req);
    
        var result = await _productSer.UpdateAsync(id, arg);
    
        if (result is FailureResult)
            return BadRequest(new ResFailure { Message = result.Message });
    
        return Ok(new ResSuccess());
    }
    
    [HttpDelete]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Delete Product",
        Description = "",
        OperationId = "Delete")]
    [SwaggerResponse(200, "Success Response", typeof(ResSuccess))]
    [SwaggerResponse(400, "Not found productId", typeof(ResFailure))]
    public async Task<ActionResult<ResBase>> DeleteProduct([FromRoute] int id)
    {
        var result = await _productSer.DeleteAsync(id);
    
        if (result is not SuccessResult)
            return BadRequest(new ResFailure { Message = result.Message });
    
        return Ok(new ResSuccess());
    }
}