using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;
using Api.Context.Entities;

namespace Api.Types.Objects.Product;

public class CreateProductReq
{
    /// <summary>
    /// Price of new product
    /// </summary>
    /// <example>10000</example>
    [Microsoft.Build.Framework.Required]
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
    [Microsoft.Build.Framework.Required]
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
    [Microsoft.Build.Framework.Required]
    public int Quantity { get; set; } = default;

    /// <summary>
    /// Author of new  book
    /// </summary>
    /// <example>Mark J. Price</example>
    [Microsoft.Build.Framework.Required]
    public string Author { get; set; } = string.Empty;

    /// <summary>
    /// ISBN-10 of new book
    /// </summary>
    /// <example>1803237805</example>
    [Microsoft.Build.Framework.Required]
    public string Isbn10 { get; set; } = string.Empty;

    /// <summary>
    /// ISBN-13 of new book
    /// </summary>
    /// <example>978-1803237800</example>
    [Microsoft.Build.Framework.Required]
    public string Isbn13 { get; set; } = string.Empty;

    /// <summary>
    /// Publisher of new book
    /// </summary>
    /// <example>Packt Publishing</example>
    [Microsoft.Build.Framework.Required]
    public string Publisher { get; set; } = string.Empty;

    /// <summary>
    /// Publication Date of new book
    /// </summary>
    /// <example>2022-8-11</example>
    [Microsoft.Build.Framework.Required]
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
    [Microsoft.Build.Framework.Required]
    public CoverType CoverType { get; set; }

    /// <summary>
    /// Category Id of new product
    /// </summary>
    /// <example>1</example>
    [Microsoft.Build.Framework.Required]
    public int CategoryId { get; set; }
}