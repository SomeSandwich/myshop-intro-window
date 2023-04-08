using System.ComponentModel.DataAnnotations;

namespace Api.Types.Objects;

public class CategoryRes
{
    public int Id { get; set; }

    public string Description { get; set; } = string.Empty;
}

public class CreateCategoryReq
{
    [StringLength(50)] public string Description { get; set; } = string.Empty;
}

public class UpdateCategoryReq
{
    [StringLength(50)] public string? Description { get; set; } = string.Empty;
}
