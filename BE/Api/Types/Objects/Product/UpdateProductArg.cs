using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;
using Api.Context.Entities;

namespace Api.Types.Objects.Product;

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
    /// Title
    /// </summary>
    /// <example>C# In Depth</example>
    [StringLength(50)]
    public string? Title { get; set; }

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