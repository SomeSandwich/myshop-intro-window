using System.ComponentModel.DataAnnotations;

namespace API.Types.Objects.Statistic;

public class StatByWeekQuery
{
    public int Year { get; set; } = DateTime.Now.Year;

    [Required] public int Week { get; set; }
}