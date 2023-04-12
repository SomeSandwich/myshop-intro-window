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

public class UpdateCategoryReq
{
    /// <summary>
    /// The New Name of Category
    /// </summary>
    /// <example>Adventure</example>
    [StringLength(50)]
    public string? Description { get; set; } = string.Empty;
}

public class CategoryRes
{
    /// <summary>
    /// Unique Id 
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }

    /// <summary>
    /// The Name of Category
    /// </summary>
    /// <example>Adventure</example>
    public string Description { get; set; } = string.Empty;
}