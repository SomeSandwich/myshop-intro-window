using Api.Services;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/category")]
public class CategoryController
{
    private readonly ICategoryService _cateSer;

    public CategoryController(ICategoryService cateSer)
    {
        _cateSer = cateSer;
    }

}