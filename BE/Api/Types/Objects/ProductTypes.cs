using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;
using Api.Context.Entities;

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
    /// Title of new product
    /// </summary>
    /// <example>C# 11 and .NET 7</example>
    [StringLength(50)]
    [Required]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Description of new product
    /// </summary>
    /// <example>Modern Cross-Platform Development</example>
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
    /// Author of new  book
    /// </summary>
    /// <example>Mark J. Price</example>
    [Required]
    public string Author { get; set; } = string.Empty;

    /// <summary>
    /// ISBN-10 of new book
    /// </summary>
    /// <example>1803237805</example>
    [Required]
    public string Isbn10 { get; set; } = string.Empty;

    /// <summary>
    /// ISBN-13 of new book
    /// </summary>
    /// <example>978-1803237800</example>
    [Required]
    public string Isbn13 { get; set; } = string.Empty;

    /// <summary>
    /// Publisher of new book
    /// </summary>
    /// <example>Packt Publishing</example>
    [Required]
    public string Publisher { get; set; } = string.Empty;

    /// <summary>
    /// Publication Date of new book
    /// </summary>
    /// <example>2022-8-11</example>
    [Required]
    public DateTime PublicationDate { get; set; }

    /// <summary>
    /// Dimensions of new book
    /// </summary>
    public Dimensions? Dimension { get; set; }

    /// <summary>
    /// Number of pages
    /// </summary>
    /// <example>100</example>
    public int NumPages { get; set; }

    /// <summary>
    /// Cover type
    /// </summary>
    /// <example>1</example>
    [Required]
    public CoverType CoverType { get; set; }

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
    public int Price { get; set; } = default;

    /// <summary>
    /// Discount of new product
    /// </summary>
    /// <example>10</example>
    public int? Discount { get; set; } = default;

    /// <summary>
    /// Title of new product
    /// </summary>
    /// <example>C# 11 and .NET 7</example>
    [StringLength(50)]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Description of new product
    /// </summary>
    /// <example>Modern Cross-Platform Development</example>
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
    /// Author of new  book
    /// </summary>
    /// <example>Mark J. Price</example>
    public string Author { get; set; } = string.Empty;

    /// <summary>
    /// ISBN-10 of new book
    /// </summary>
    /// <example>1803237805</example>
    public string Isbn10 { get; set; } = string.Empty;

    /// <summary>
    /// ISBN-13 of new book
    /// </summary>
    /// <example>978-1803237800</example>
    public string Isbn13 { get; set; } = string.Empty;

    /// <summary>
    /// Publisher of new book
    /// </summary>
    /// <example>Packt Publishing</example>
    public string Publisher { get; set; } = string.Empty;

    /// <summary>
    /// Publication Date of new book
    /// </summary>
    /// <example>2022-8-11</example>
    public DateTime PublicationDate { get; set; }

    /// <summary>
    /// Dimensions of new book
    /// </summary>
    public Dimensions? Dimension { get; set; }

    /// <summary>
    /// Number of pages
    /// </summary>
    /// <example>100</example>
    public int NumPages { get; set; }

    /// <summary>
    /// Cover type
    /// </summary>
    /// <example>1</example>
    public CoverType CoverType { get; set; }

    /// <summary>
    /// Category Id of new product
    /// </summary>
    /// <example>1</example>
    public int CategoryId { get; set; }
}

public class UpdateProductReq
{
    /// <summary>
    /// Price of product
    /// </summary>
    public int? Price { get; set; }

    /// <summary>
    /// Discount of product
    /// </summary>
    public int? Discount { get; set; }

    /// <summary>
    /// Description of product
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Quantity of product
    /// </summary>
    public int? Quantity { get; set; }

    /// <summary>
    /// Author of book
    /// </summary>
    public string? Author { get; set; }

    /// <summary>
    /// ISBN-10 of book
    /// </summary>
    public string? Isbn10 { get; set; }

    /// <summary>
    /// ISBN-13 of book
    /// </summary>
    public string? Isbn13 { get; set; }

    /// <summary>
    /// Publisher of book
    /// </summary>
    public string? Publisher { get; set; } 
    
    /// <summary>
    /// Publication Date of book
    /// </summary>
    public DateTime? PublicationDate { get; set; }

    /// <summary>
    /// Dimensions of book
    /// </summary>
    public Dimensions? Dimension { get; set; }

    /// <summary>
    /// Number of pages
    /// </summary>
    public int? NumPages { get; set; }

    /// <summary>
    /// Cover type
    /// </summary>
    public CoverType? CoverType { get; set; }

    /// <summary>
    /// Category Id of product
    /// </summary>
    public int? CategoryId { get; set; }

    /// <summary>
    /// List File of product
    /// </summary>
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
    /// Author of book
    /// </summary>
    public string? Author { get; set; }

    /// <summary>
    /// ISBN-10 of book
    /// </summary>
    public string? Isbn10 { get; set; }

    /// <summary>
    /// ISBN-13 of book
    /// </summary>
    public string? Isbn13 { get; set; }

    /// <summary>
    /// Publisher of book
    /// </summary>
    public string? Publisher { get; set; }

    /// <summary>
    /// Publication Date of book
    /// </summary>
    public DateTime? PublicationDate { get; set; }

    /// <summary>
    /// Dimensions of book
    /// </summary>
    public Dimensions? Dimension { get; set; }

    /// <summary>
    /// Number of pages
    /// </summary>
    /// <example>100</example>
    public int? NumPages { get; set; }

    /// <summary>
    /// Cover type
    /// </summary>
    /// <example>1</example>
    public CoverType? CoverType { get; set; }

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
    
    [StringLength(50)]
    public string Title { get; set; } = string.Empty;

    public int Discount { get; set; } = default;

    public string Description { get; set; } = string.Empty;

    public List<string> MediaPath { get; set; } = new List<string>();

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

    public int Quantity { get; set; } = default;

    public string Author { get; set; } = string.Empty;

    public string Isbn10 { get; set; } = string.Empty;

    public string Isbn13 { get; set; } = string.Empty;

    public string Publisher { get; set; } = string.Empty;

    public DateTime PublicationDate { get; set; }

    public Dimensions? Dimension { get; set; }

    public int NumPages { get; set; }

    public CoverType CoverType { get; set; }

    [DefaultValue(ProductStatus.Default)] public ProductStatus Status { get; set; }

    public int CategoryId { get; set; }
}

#endregion