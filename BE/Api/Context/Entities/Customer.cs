using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Context.Entities;

public class Customer
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [StringLength(50)] public string Name { get; set; } = string.Empty;

    [StringLength(11)] public string PhoneNumber { get; set; } = string.Empty;

    // public DateTime JoinDate { get; set; }
    
    public virtual ICollection<Order> Orders { get; set; }
}