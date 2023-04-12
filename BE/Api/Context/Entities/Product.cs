using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using Api.Context.Constants.Enums;
using Newtonsoft.Json;

namespace Api.Context.Entities;

/// <summary>
/// Product
/// </summary>
public class Product
{
    /// <summary>
    /// Identity
    /// </summary>
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    /// <summary>
    /// Price
    /// </summary>
    public int Price { get; set; } = default;

    /// <summary>
    /// Discount
    /// </summary>
    public int Discount { get; set; } = default;

    /// <summary>
    /// Title
    /// </summary>
    [StringLength(50)]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Description
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// MediaPath
    /// </summary>
    public List<string> MediaPath { get; set; } = new List<string>();

    /// <summary>
    /// CreateAt
    /// </summary>
    public DateTime CreateAt { get; set; }

    /// <summary>
    /// UpdateAt
    /// </summary>
    public DateTime UpdateAt { get; set; }

    /// <summary>
    /// Quantity
    /// </summary>
    public int Quantity { get; set; } = default;

    /// <summary>
    /// Status
    /// </summary>
    [DefaultValue(ProductStatus.Default)]
    public ProductStatus Status { get; set; }


    /// <summary>
    /// Author of book
    /// </summary>
    public string Author { get; set; } = string.Empty;

    /// <summary>
    /// ISBN-10 of book
    /// </summary>
    public string Isbn10 { get; set; } = string.Empty;

    /// <summary>
    /// ISBN-13 of book
    /// </summary>
    public string Isbn13 { get; set; } = string.Empty;

    /// <summary>
    /// Publisher of book
    /// </summary>
    public string Publisher { get; set; } = string.Empty;

    /// <summary>
    /// Publication Date of book
    /// </summary>
    public DateTime PublicationDate { get; set; }

    /// <summary>
    /// Dimensions of book
    /// </summary>
    [NotMapped]
    public Dimensions? Dimension { get; set; }

    /// <summary>
    /// Dimension json of book
    /// </summary>
    public string? DimensionJSON
    {
        get => Dimension is null
            ? null
            : JsonConvert.SerializeObject(Dimension);

        set => Dimension = string.IsNullOrEmpty(DimensionJSON)
            ? null
            : JsonConvert.DeserializeObject<Dimensions>(DimensionJSON);
    }

    /// <summary>
    /// Hardcover of book
    /// </summary>
    public int Hardcover { get; set; }

    /// <summary>
    /// CategoryId
    /// </summary>
    [ForeignKey("Category")]
    public int CategoryId { get; set; }

    public virtual Category Category { get; set; }


    /// <summary>
    /// OrderDetails
    /// </summary>
    public virtual ICollection<OrderDetail> OrderDetails { get; set; }
}

public struct Dimensions
{
    /// <summary>
    /// Chiều cao
    /// </summary>
    public double Height { get; set; }

    /// <summary>
    /// Chiều rộng
    /// </summary>
    public double Width { get; set; }

    /// <summary>
    /// Chiều dài
    /// </summary>
    public double Length { get; set; }
}