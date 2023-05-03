using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;
using Api.Context.Entities;

namespace Api.Types.Objects.Product;

public class UpdateProductReq
{
    /// <summary>
    /// Cost
    /// </summary>
    /// <example>8000</example>
    public int Cost { get; set; }

    /// <summary>
    /// Price of product
    /// </summary>
    public int? Price { get; set; }

    /// <summary>
    /// Discount of product
    /// </summary>
    public int? Discount { get; set; }

    /// <summary>
    /// Title
    /// </summary>
    [StringLength(50)]
    public string? Title { get; set; }

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
    public DateOnly? PublicationDate { get; set; }

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

    // /// <summary>
    // /// List File Delete 
    // /// </summary>
    // public ICollection<string>? MediaFileDeletes { get; set; }
}