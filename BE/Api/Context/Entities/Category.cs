using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Context.Entities;

public class Category
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [StringLength(50)] public string Description { get; set; } = string.Empty;


    public virtual ICollection<Product> Products { get; set; }
}

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasData(new Category
        {
            Id = 1,
            Description = "Adventure"
        }, new Category
        {
            Id = 2,
            Description = "Comic Book"
        }, new Category
        {
            Id = 3,
            Description = "Detective"
        }, new Category
        {
            Id = 4,
            Description = "Mystery"
        }, new Category
        {
            Id = 5,
            Description = "Fantasy"
        }, new Category
        {
            Id = 6,
            Description = "Horror"
        }, new Category
        {
            Id = 7,
            Description = "Literary Fiction"
        }, new Category
        {
            Id = 8,
            Description = "Romance"
        }, new Category
        {
            Id = 9,
            Description = "Science Fiction"
        }, new Category
        {
            Id = 10,
            Description = "Short Stories"
        }, new Category
        {
            Id = 11,
            Description = "Suspense"
        }, new Category
        {
            Id = 12,
            Description = "Thrillers"
        }, new Category
        {
            Id = 13,
            Description = "Biographies"
        }, new Category
        {
            Id = 14,
            Description = "History"
        }, new Category
        {
            Id = 15,
            Description = "Memoir"
        }, new Category
        {
            Id = 16,
            Description = "Poetry"
        }, new Category
        {
            Id = 17,
            Description = "Self-Help"
        });
    }
}