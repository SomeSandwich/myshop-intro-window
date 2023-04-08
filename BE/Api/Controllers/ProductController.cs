using Api.Services;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/product")]
public class ProductController
{
    private readonly IProductService _productSer;

    public ProductController(IProductService productSer)
    {
        _productSer = productSer;
    }
}