namespace Api.Types.Objects;

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