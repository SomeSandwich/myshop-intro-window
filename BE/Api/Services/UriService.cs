using System.Net;
using System.Web;
using API.Types.Objects.Filter;
using Microsoft.AspNetCore.WebUtilities;

namespace Api.Services;

public interface IUriService
{
    public Uri GetPageUri(PaginationFilter filter, string route);
}

public class UriService : IUriService
{
    private readonly string _baseUri;

    public UriService(string baseUri)
    {
        _baseUri = baseUri;
    }

    public Uri GetPageUri(PaginationFilter filter, string route)
    {
        var uri = string.Concat(_baseUri, route);
        var endpointUri = new Uri(uri);

        var query = HttpUtility.ParseQueryString(string.Empty);

        if (filter is OrderPagingFilter pagingFilter)
        {
            if (pagingFilter.CustomerId is not null)
            {
                query["CustomerId"] = pagingFilter.CustomerId.ToString();
            }

            if (pagingFilter.DateFrom is not null)
            {
                var q = ((DateOnly)pagingFilter.DateFrom).ToString("yyyy-MM-dd");
                query["DateFrom"] = q;
            }

            if (pagingFilter.DateTo is not null)
            {
                var q = ((DateOnly)pagingFilter.DateTo).ToString("yyyy-MM-dd");
                query["DateTo"] = q;
            }
        }

        query["PageSize"] = filter.PageSize.ToString();
        query["PageNumber"] = filter.PageNumber.ToString();

        return new Uri(endpointUri + "?" + query);
    }
}