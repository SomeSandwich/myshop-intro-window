namespace API.Types.Objects.Filter;

public class PaginationFilter
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    
    public PaginationFilter()
    {
        this.PageNumber = 1;
        this.PageSize = 10;
    }
    
    public PaginationFilter(int pageNumber, int pageSize)
    {
        this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
        this.PageSize = pageSize < 1 ? 1 : pageSize;
    }
}

public class OrderPagingFilter : PaginationFilter
{
    public int? CustomerId { get; set; }
    
    public DateOnly? DateFrom { get; set; } 

    public DateOnly? DateTo { get; set; }
}