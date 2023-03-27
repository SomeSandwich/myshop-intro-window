using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Context.Constants.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Context.Entities;

public class Account
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [StringLength(20)] public string Username { get; set; } = string.Empty;

    [StringLength(60)] public string Password { get; set; } = string.Empty;

    [StringLength(50)] public string Email { get; set; } = string.Empty;

    [DefaultValue(AccountStatus.Activate)] public AccountStatus Status { get; set; }


    public virtual ICollection<Order> Orders { get; set; }
}

public class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.HasData(new Account
        {
            Id = 1,
            Username = "root",
            Password = "$2a$10$3kzeMxE/RIuXCnzNFUgC4uKMrANCNn9xtP9U9aCci2Ru0Enxp1eqK",
            Email = "admin@admin.com",
            Status = AccountStatus.Activate,
        });
    }
}