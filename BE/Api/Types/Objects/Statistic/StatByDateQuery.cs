using System.ComponentModel.DataAnnotations;
using Bogus.DataSets;

namespace API.Types.Objects.Statistic;

public class StatByDateQuery
{
    [Required] public DateOnly DateFrom { get; set; }

    [Required] public DateOnly DateTo { get; set; }
}