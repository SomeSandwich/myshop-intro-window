using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects;

public class UpdateCategoryReq
{
    /// <summary>
    /// The New Name of Category
    /// </summary>
    /// <example>Adventure</example>
    [StringLength(50)]
    public string? Description { get; set; } = string.Empty;
}