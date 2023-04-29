namespace API.Types.Objects.Statistic;

public class StatByCateQuery
{
    public DateOnly DateFrom { get; set; } = default;

    public DateOnly DateTo { get; set; } = DateOnly.FromDateTime(DateTime.Now);
}