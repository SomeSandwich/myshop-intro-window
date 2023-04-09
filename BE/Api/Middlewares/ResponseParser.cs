using System.Text.Json;
using API.Types.Objects;

namespace MMS.GateApi.Middlewares;

public static class ResponseParser
{
    public static IApplicationBuilder UseResponseParser(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ResponseParserMiddleware>();
    }

    public class ResponseParserMiddleware
    {
        private readonly RequestDelegate _next;

        public ResponseParserMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var originBody = context.Response.Body;
            try
            {
                var memStream = new MemoryStream();
                context.Response.Body = memStream;

                await _next(context).ConfigureAwait(false);

                memStream.Position = 0;
                var responseBody = new StreamReader(memStream).ReadToEnd();

                var statusCode = context.Response.StatusCode;
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                context.Response.ContentType = "application/json";

                switch (statusCode)
                {
                    case 400:
                        responseBody =
                            JsonSerializer.Serialize(Responses<string>.BadRequest(responseBody), options);
                        break;
                    case 403:
                        responseBody =
                            JsonSerializer.Serialize(Responses<string>.Forbidden("Forbidden"), options);
                        break;
                    case 404:
                        responseBody =
                            JsonSerializer.Serialize(Responses<string>.NotFound(responseBody), options);
                        break;
                    default:
                        {
                            if (responseBody.Length == 0)
                            {
                                responseBody = JsonSerializer.Serialize(Responses<string>.Success(), options);
                            }
                            else
                            {
                                responseBody = JsonSerializer.Serialize(
                                    Responses<object>.SuccessData("Success",
                                        JsonSerializer.Deserialize<object>(responseBody)), options
                                );
                            }

                            break;
                        }
                }

                var memoryStreamModified = new MemoryStream();
                var sw = new StreamWriter(memoryStreamModified);
                await sw.WriteAsync(responseBody);
                await sw.FlushAsync();
                memoryStreamModified.Position = 0;

                await memoryStreamModified.CopyToAsync(originBody).ConfigureAwait(false);
            }
            finally
            {
                context.Response.Body = originBody;
            }
        }
    }
}

public static class Responses<T>
{
    public static BaseResponse BadRequest(string message)
    {
        return new BaseResponse { Message = message };
    }

    public static BaseResponse NotFound(string message)
    {
        return new BaseResponse { Message = message };
    }

    public static BaseResponse Forbidden(string message)
    {
        return new BaseResponse { Message = message };
    }

    public static BaseResponse Success()
    {
        return new BaseResponse { Message = "Success" };
    }

    public static BaseResponse ServerError(string message)
    {
        return new BaseResponse { Message = message };
    }

    public static BaseDataResponse<T> SuccessData(string message, T data)
    {
        return new BaseDataResponse<T> { Message = message, Data = data };
    }
}

public class BaseResponse
{
    public string Message { get; set; }
}

public class BaseDataResponse<T> : BaseResponse
{
    public T Data { get; set; }
}
