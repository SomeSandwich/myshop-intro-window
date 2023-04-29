namespace API.Types.Objects.Statistic;

public class StatByMonthQuery
{
    public int Year { get; set; } = DateTime.Now.Year;

    public int Month { get; set; } = DateTime.Now.Month;
}