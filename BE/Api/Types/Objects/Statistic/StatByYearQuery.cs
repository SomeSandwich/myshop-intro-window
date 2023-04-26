namespace API.Types.Objects.Statistic;

public class StatByYearQuery
{
    public int? Year { get; set; } = DateTime.Now.Year;
}