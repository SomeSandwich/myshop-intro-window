using Api.Services;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/order")]
public class OrderController
{
    private readonly IOrderService _orSer;

    public OrderController(IOrderService orSer)
    {
        _orSer = orSer;
    }

}