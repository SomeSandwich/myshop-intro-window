using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using Api.Context.Constants.Enums;

namespace Api.Context.Entities;

public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int Price { get; set; } = default;

    public int Discount { get; set; } = default;

    [StringLength(50)] public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public List<string> MediaPath { get; set; } = new List<string>();

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

    public int Quantity { get; set; } = default;

    [DefaultValue(ProductStatus.Default)] public ProductStatus Status { get; set; }

    [ForeignKey("Category")] public int CategoryId { get; set; }
    public virtual Category Category { get; set; }


    public virtual ICollection<OrderDetail> OrderDetails { get; set; }
}