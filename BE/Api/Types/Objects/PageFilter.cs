using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Types.Objects;

public class PageFilter
{
    [Range(0, int.MaxValue)] public int number { get; set; } // trang cần tới
    [Range(0, int.MaxValue)] public int size { get; set; } // kích thước

    public PageFilter()
    {
        this.number = 1;
        this.size = 10;
    }

    public PageFilter(int pageNumber, int pageSize)
    {
        this.number = pageNumber < 1 ? 1 : pageNumber;
        this.size = pageSize < 1 ? 1 : pageSize;
    }

    public string? query { get; set; } // tìm
}

public class OrderFilter : PageFilter
{
    [JsonIgnore] public int? UserId { get; set; }

    public DateOnly DateFrom { get; set; }

    public DateOnly DateTo { get; set; }
}

public class ProductFilter : PageFilter
{
}

public record PageResult<T>
{
    public string Next { get; set; }

    public string Previous { get; set; }

    public int Current { get; set; }

    public int Total { get; set; }

    public int Records { get; set; }

    public IEnumerable<T> Data { get; set; }
}