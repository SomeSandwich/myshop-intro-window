using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Api.Context.Constants.Enums;
using Api.Context.Entities;

namespace Api.Types.Objects.Product;

public class ProductRes
{
    public ProductRes(string categoryDescription)
    {
        CategoryDescription = categoryDescription;
    }

    /// <summary>
    /// Id of its Product
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }

    /// <summary>
    /// Price of new product
    /// </summary>
    /// <example>10000</example>
    public int Price { get; set; }


    /// <summary>
    /// Title of new product
    /// </summary>
    /// <example>C# 11 and .NET 7</example>
    [StringLength(50)]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Discount of new product
    /// </summary>
    /// <example>10</example>
    public int Discount { get; set; }

    /// <summary>
    /// Description of new product
    /// </summary>
    /// <example>Modern Cross-Platform Development</example>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// List Path of product
    /// </summary>
    /// <example>[ "product/2gtRCV1eaV3p49", "product/Njc8N47gPyoBaj" ]</example>
    public List<string> MediaPath { get; set; } = new();

    /// <summary>
    /// When Product is created
    /// </summary>
    /// <example>2019-08-24T14:15:22Z</example>
    public DateTime CreateAt { get; set; }

    /// <summary>
    /// Latest time Product is updated
    /// </summary>
    /// <example>2019-08-24T14:15:22Z</example>
    public DateTime UpdateAt { get; set; }

    /// <summary>
    /// Quantity of new product
    /// </summary>
    /// <example>10</example>
    public int Quantity { get; set; }

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
    /// Publication Date of new book
    /// </summary>
    /// <example>2022-8-11</example>
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
    /// 
    /// </summary>
    [DefaultValue(ProductStatus.Default)]
    public ProductStatus Status { get; set; }


    /// <summary>
    /// Cover type
    /// </summary>
    /// <example>1</example>
    public int CategoryId { get; set; }

    /// <summary>
    /// Category Id of new product
    /// </summary>
    /// <example>1</example>
    public string CategoryDescription { get; set; }
}