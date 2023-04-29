namespace API.Types.Objects.Statistic;

public class StatByWeekDto
{
    public DateOnly Date { get; set; } = default;

    public int Quantity { get; set; } = 0;

    public int Cost { get; set; } = 0;

    public int Revenue { get; set; } = 0;

    public int Profit { get; set; } = 0;
}