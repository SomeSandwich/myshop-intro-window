using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Context.Constants.Enums;
using Api.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Context.Entities;

public class Customer
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [StringLength(50)] public string Name { get; set; } = string.Empty;

    [StringLength(11)] public string PhoneNumber { get; set; } = string.Empty;

    public DateOnly JoinDate { get; set; }
    
    public virtual ICollection<Order> Orders { get; set; }
}

public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.HasData(new Customer
        {
            Id = 1,
            Name = "Khách vãng lai",
            PhoneNumber = "0123456789",
            JoinDate = default
        });
    }
}