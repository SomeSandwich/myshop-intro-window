using Api.Services;
using Api.Types.GlobalTypes;
using Api.Types.Objects;
using Api.Types.Results;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/category")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _cateSer;

    public CategoryController(ICategoryService cateSer)
    {
        _cateSer = cateSer;
    }

    [HttpGet]
    [Route("")]
    [SwaggerOperation(
        Summary = "Get All Category And Its Products",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<CategoryRes>))]
    public async Task<ActionResult<IEnumerable<CategoryRes>>> GetAll()
    {
        var categories = await _cateSer.GetAsync();

        return Ok(categories);
    }

    [HttpGet]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Get Category Has Id And Its Products",
        Description = "",
        OperationId = "Get")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CategoryRes))]
    [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ResFailure))]
    public async Task<ActionResult<CategoryRes>> GetById([FromRoute] int id)
    {
        // TODO: Paging
        var cate = await _cateSer.GetAsync(id);

        if (cate is null)
            return NotFound(new ResFailure
            {
                Message = $"Not Found Category Has Id:{id}"
            });

        return Ok(cate);
    }

    [HttpPost]
    [Route("")]
    [SwaggerOperation(
        Summary = "Create A Category",
        Description = "",
        OperationId = "Post")]
    [SwaggerResponse(StatusCodes.Status201Created, Type = typeof(ResSuccess))]
    public async Task<ActionResult<ResSuccess>> Create([FromBody] CreateCategoryReq req)
    {
        var cateId = await _cateSer.CreateAsync(req);

        return CreatedAtAction(nameof(GetById), new { id = cateId }, new ResSuccess());
    }

    [HttpPatch]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Update A Category",
        Description = "",
        OperationId = "Post")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ResSuccess))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ResFailure))]
    public async Task<ActionResult<ResSuccess>> Update([FromRoute] int id, [FromBody] UpdateCategoryReq req)
    {
        var result = await _cateSer.UpdateAsync(id, req);
        if (result.Status == StatusReturn.Failure)
            return BadRequest(new ResFailure
            {
                Message = result.Message
            });

        return Ok(new ResSuccess());
    }

    [HttpDelete]
    [Route("{id:int}")]
    [SwaggerOperation(
        Summary = "Delete A Category",
        Description = "Will Fail If Category Has Product",
        OperationId = "Post")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ResSuccess))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ResFailure))]
    public async Task<ActionResult<ResSuccess>> Delete([FromRoute] int id)
    {
        var result = await _cateSer.DeleteAsync(id);
        if (result.Status == StatusReturn.Failure)
            return BadRequest(new ResFailure
            {
                Message = result.Message
            });

        return Ok(new ResSuccess());
    }
}