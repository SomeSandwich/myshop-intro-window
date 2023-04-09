using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using Api.Types.Mapping;
using Api.Types.Objects;
using Api.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services;

public interface IAuthService
{
    Task<Account> LoginAsync(LoginReq req);
    Task<LoginRes> GenerateTokenAsync(Account account, string ipv4);
    Task<LoginRes> RefreshTokenAsync(string refreshToken, string ipv4);
}

public class AuthService : IAuthService
{
    private readonly MyShopDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public AuthService(MyShopDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;

        var mapperConfig = new MapperConfiguration(opt => { opt.AddProfile<AuthProfile>(); });
        _mapper = mapperConfig.CreateMapper();
    }

    public async Task<Account> LoginAsync(LoginReq req)
    {
        var account = await _context.Accounts
            .FirstOrDefaultAsync(e => e.Username == req.Username);

        if (account == null)
        {
            throw new Exception($"Not found User with Username:{req.Username}");
        }

        if (account.Status == AccountStatus.Deleted)
        {
            throw new Exception("User was deleted!!!");
        }

        if (account.Status == AccountStatus.Locked)
        {
            throw new Exception("User was disabled");
        }

        if (!req.Password.ValidatePassword(account.Password))
        {
            throw new AuthenticationException("Wrong Password");
        }

        return account;
    }

    public async Task<LoginRes> GenerateTokenAsync(Account account, string ipv4)
    {
        var tokenExpires = DateTime.UtcNow.AddHours(7).AddMinutes(30);
        var secretKey = _configuration["JWT:Secret"]!;

        var jwtTokenHandler = new JwtSecurityTokenHandler();

        var key = Encoding.ASCII.GetBytes(secretKey);
        var authClaims = new List<Claim>
        {
            new(ClaimTypes.Name, account.Id.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
        };
        var token = new JwtSecurityToken
        (expires: tokenExpires,
            claims: authClaims,
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature));

        var jwtToken = jwtTokenHandler.WriteToken(token);
        var refreshToken = new RefreshToken
        {
            JwtId = token.Id,
            AddedDate = DateTime.UtcNow.AddHours(7),
            ExpiryDate = DateTime.UtcNow.AddHours(31),
            IsRevoked = false,
            Token = jwtToken,
            IpAddress = ipv4,
            AccountId = account.Id
        };
        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();
        return new LoginRes { Token = jwtToken };
    }

    public async Task<LoginRes> RefreshTokenAsync(string refreshToken, string ipv4)
    {
        var oldToken = await _context.RefreshTokens
            .Where(e => e.Token == refreshToken)
            .FirstOrDefaultAsync();

        if (oldToken is null) throw new AuthenticationException("Wrong token");

        var account = await _context.Accounts
            .Where(e =>
                e.Id == oldToken.AccountId &&
                e.Status != AccountStatus.Deleted)
            .FirstOrDefaultAsync();

        if (account is null)
        {
            throw new AuthenticationException("Account is deleted or not exists");
        }

        oldToken.IsUsed = true;
        _context.RefreshTokens.Update(oldToken);
        await _context.SaveChangesAsync();

        return await GenerateTokenAsync(account, ipv4);
    }
}