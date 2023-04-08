using System.ComponentModel;
using Api.Context.Constants.Enums;

namespace Api.Types.Objects;

public class ProductRes
{
    public int Id { get; set; }

    public int Price { get; set; } = default;

    public int Discount { get; set; } = default;

    public string Description { get; set; } = string.Empty;

    public List<string> MediaPath { get; set; } = new List<string>();

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

    public int Quantity { get; set; } = default;

    [DefaultValue(ProductStatus.Default)] public ProductStatus Status { get; set; }

    public int CategoryId { get; set; }
}

public class CreateProductReq
{
    public int Price { get; set; } = default;

    public int? Discount { get; set; } = default;

    public string? Description { get; set; } = string.Empty;

    public IFormFileCollection? MediaFiles { get; set; }

    public int Quantity { get; set; } = default;

    [DefaultValue(ProductStatus.Default)] public ProductStatus Status { get; set; }

    public int CategoryId { get; set; }
}

public class CreateProductArg
{
    public int? Price { get; set; } = default;

    public int? Discount { get; set; } = default;

    public string? Description { get; set; } = string.Empty;

    public List<string> MediaPath { get; set; } = new List<string>();

    public int Quantity { get; set; } = default;

    [DefaultValue(ProductStatus.Default)] public ProductStatus Status { get; set; }

    public int? CategoryId { get; set; }
}

public class UpdateProductReq
{
    public int? Price { get; set; } = default;

    public int? Discount { get; set; } = default;

    public string? Description { get; set; } = string.Empty;

    public int? Quantity { get; set; } = default;
    
    public int? CategoryId { get; set; }
    
    public IFormFileCollection? MediaFiles{ get; set; }
    
    public ICollection<string>? MediaFileDeletes { get; set; }
}

public class UpdateProductArg
{
    public int? Price { get; set; } = default;

    public int? Discount { get; set; } = default;

    public string? Description { get; set; } = string.Empty;

    public int? Quantity { get; set; } = default;
    
    public int? CategoryId { get; set; }
    
    public ICollection<string>? MediaFilesAdd{ get; set; }
    
    public ICollection<string>? MediaFilesDel{ get; set; }
}