using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Context.Entities;

public class RefreshToken
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [ForeignKey("User")] public int UserId { get; set; }
    public string Token { get; set; } = string.Empty;

    public string JwtId { get; set; } = string.Empty; // Map the token with jwtId

    [DefaultValue(false)]
    public bool IsUsed { get; set; } // if its used we dont want generate a new Jwt token with the same refresh token

    [DefaultValue(false)] public bool IsRevoked { get; set; } // if it has been revoke for security reasons

    public DateTime AddedDate { get; set; }

    public DateTime ExpiryDate { get; set; } // Refresh token is long lived it could last for months.

    public string IpAddress { get; set; } = string.Empty;

    public virtual Account Account { get; set; }
}