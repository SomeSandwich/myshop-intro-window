using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Minio.DataModel;

namespace Api.Controllers;

public class OrderDetail
{
    [Key]
    [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; } = default;

}