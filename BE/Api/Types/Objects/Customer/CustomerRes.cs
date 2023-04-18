namespace Api.Types.Objects.Customer;

public class CustomerRes
{
    /// <summary>
    /// Unique Customer Id
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }

    /// <summary>
    /// Name of customer
    /// </summary>
    /// <example>John</example>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Phone number of customer
    /// </summary>
    /// <example>0123456789</example>
    public string PhoneNumber { get; set; } = string.Empty;

    /// <summary>
    /// Date of join
    /// </summary>
    /// <example>2022-01-01</example>
    public DateOnly JoinDate { get; set; }

    /// <summary>
    /// List of Order of Its Category
    /// </summary>
    /// <example></example>
    public ICollection<Context.Entities.Order> Orders { get; set; }
}