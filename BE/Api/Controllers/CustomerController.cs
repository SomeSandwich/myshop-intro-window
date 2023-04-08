using Api.Services;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/customer")]
public class CustomerController
{
    private readonly ICustomerService _cusSer;

    public CustomerController(ICustomerService cusSer)
    {
        _cusSer = cusSer;
    }
}