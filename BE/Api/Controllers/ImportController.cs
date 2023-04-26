using Api.Services;
using API.Types.Objects.Import;
using Api.Types.Results;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{v:ApiVersion}/import")]
public class ImportController : ControllerBase
{
    private readonly IImportService _importService;

    public ImportController(IImportService importService)
    {
        _importService = importService;
    }

    [HttpPost]
    public async Task<IActionResult> ImportExcelProduct([FromForm] ImportExcelProductReq req)
    {
        var result = await _importService.ImportExcelProductAsync(req);

        return result switch
        {
            FailureResult => BadRequest(result),
            _ => Ok(result)
        };
    }
}