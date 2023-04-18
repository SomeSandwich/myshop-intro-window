using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects;

public class CreateCategoryReq
{
    /// <summary>
    /// The Name of Category
    /// </summary>
    /// <example>Horror</example>
    [StringLength(50)]
    public string Description { get; set; } = string.Empty;
}