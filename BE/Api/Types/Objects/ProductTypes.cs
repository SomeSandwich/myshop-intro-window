using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;

namespace Api.Types.Objects;

#region Request

public class CreateProductReq
{
    /// <summary>
    /// Price of new product
    /// </summary>
    /// <example>10000</example>
    [Required]
    public int Price { get; set; } = default;

    /// <summary>
    /// Discount of new product
    /// </summary>
    /// <example>10</example>
    public int? Discount { get; set; } = default;

    /// <summary>
    /// Description of new product
    /// </summary>
    /// <example>This is a genuine product imported and distributed by ABC company.</example>
    public string? Description { get; set; } = string.Empty;

    /// <summary>
    /// List File of new product
    /// </summary>
    /// <example>.jgp</example>
    public IFormFileCollection? MediaFiles { get; set; }

    /// <summary>
    /// Quantity of new product
    /// </summary>
    /// <example>10</example>
    [Required]
    public int Quantity { get; set; } = default;

    /// <summary>
    /// Category Id of new product
    /// </summary>
    /// <example>1</example>
    [Required]
    public int CategoryId { get; set; }
}

public class CreateProductArg
{
    /// <summary>
    /// Price of new product
    /// </summary>
    /// <example>10000</example>
    [Required]
    public int Price { get; set; } = default;

    /// <summary>
    /// Discount of new product
    /// </summary>
    /// <example>10</example>
    public int? Discount { get; set; } = default;

    /// <summary>
    /// Description of new product
    /// </summary>
    /// <example>This is a genuine product imported and distributed by ABC company.</example>
    public string? Description { get; set; } = string.Empty;

    /// <summary>
    /// Path of media
    /// </summary>
    /// <example>abc.jpg</example>
    public List<string> MediaPath { get; set; } = new List<string>();

    /// <summary>
    /// Quantity of new product
    /// </summary>
    /// <example>10</example>
    public int Quantity { get; set; } = default;

    [DefaultValue(ProductStatus.Default)] public ProductStatus Status { get; set; }

    /// <summary>
    /// Category Id of new product
    /// </summary>
    /// <example>1</example>
    public int? CategoryId { get; set; }
}

public class UpdateProductReq
{
    /// <summary>
    /// Price of product
    /// </summary>
    /// <example>10000</example>
    public int? Price { get; set; }

    /// <summary>
    /// Discount of product
    /// </summary>
    /// <example>10</example>
    public int? Discount { get; set; }

    /// <summary>
    /// Description of product
    /// </summary>
    /// <example>This is a genuine product imported and distributed by ABC company.</example>
    public string? Description { get; set; }

    /// <summary>
    /// Quantity of product
    /// </summary>
    /// <example>10</example>
    public int? Quantity { get; set; }

    /// <summary>
    /// Category Id of product
    /// </summary>
    /// <example>1</example>
    public int? CategoryId { get; set; }

    /// <summary>
    /// List File of product
    /// </summary>
    /// <example>.jgp</example>
    public IFormFileCollection? MediaFiles { get; set; }

    /// <summary>
    /// List File Delete 
    /// </summary>
    public ICollection<string>? MediaFileDeletes { get; set; }
}

public class UpdateProductArg
{
    /// <summary>
    /// Price of product
    /// </summary>
    /// <example>10000</example>
    public int? Price { get; set; }

    /// <summary>
    /// Discount of product
    /// </summary>
    /// <example>10</example>
    public int? Discount { get; set; }

    /// <summary>
    /// Description of product
    /// </summary>
    /// <example>This is a genuine product imported and distributed by ABC company.</example>
    public string? Description { get; set; } 

    /// <summary>
    /// Quantity of product
    /// </summary>
    /// <example>10</example>
    public int? Quantity { get; set; }

    /// <summary>
    /// Category Id of product
    /// </summary>
    /// <example>1</example>
    public int? CategoryId { get; set; }

    /// <summary>
    /// List Path file add
    /// </summary>
    public ICollection<string>? MediaFilesAdd { get; set; }

    /// <summary>
    /// List path file delete
    /// </summary>
    public ICollection<string>? MediaFilesDel { get; set; }
}

#endregion

#region Respone

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

#endregion