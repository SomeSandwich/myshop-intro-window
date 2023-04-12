using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using Api.Types;
using Api.Types.Mapping;
using Api.Types.Objects;
using Api.Types.Results;
using Api.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IAccountService
{
    Task<IEnumerable<AccountRes>> GetAsync();
    Task<AccountRes> GetAsync(int id);

    Task<int> CreateAsync(CreateAccountReq req);

    Task<BaseResult> UpdateInfoAccAsync(int id, UpdateInfoAccReq req);
    Task<BaseResult> UpdateSelfPasswordAsync(int id, SelfUpdatePasswordReq req);
    Task<BaseResult> ToggleLockAsync(int id);

    Task<BaseResult> DeleteAsync(int id);
}

public class AccountService : IAccountService
{
    private readonly MyShopDbContext _context;
    private readonly IMapper _mapper;


    public AccountService(MyShopDbContext context)
    {
        _context = context;

        var config = new MapperConfiguration(opt => { opt.AddProfile<AccountProfile>(); });
        _mapper = config.CreateMapper();
    }

    public async Task<IEnumerable<AccountRes>> GetAsync()
    {
        var listAcc = await _context.Accounts
            .Where(e => e.Status != AccountStatus.Deleted)
            .ToListAsync();

        return _mapper.Map<IEnumerable<Account>, IEnumerable<AccountRes>>(listAcc);
    }

    public async Task<AccountRes> GetAsync(int id)
    {
        var acc = _context.Accounts
            .FirstOrDefault(e => e.Id == id && e.Status != AccountStatus.Deleted);

        return _mapper.Map<Account, AccountRes>(acc);
    }

    public async Task<int> CreateAsync(CreateAccountReq req)
    {
        var acc = _mapper.Map<CreateAccountReq, Account>(req);

        await _context.Accounts.AddAsync(acc);

        return acc.Id;
    }

    public async Task<BaseResult> UpdateInfoAccAsync(int id, UpdateInfoAccReq req)
    {
        var acc = await _context.Accounts
            .FirstOrDefaultAsync(e => e.Id == id && e.Status != AccountStatus.Deleted);

        if (acc is null)
            return new FailureResult
            {
                Message = $"Not found account with id:{id}"
            };

        // acc.Username = string.IsNullOrEmpty(req.Username) ? acc.Username : req.Username;
        acc.Email = string.IsNullOrEmpty(req.Email) ? acc.Email : req.Email;

        await _context.SaveChangesAsync();

        return new SuccessResult();
    }

    public async Task<BaseResult> UpdateSelfPasswordAsync(int id, SelfUpdatePasswordReq req)
    {
        var acc = _context.Accounts
            .FirstOrDefault(e => e.Id == id && e.Status != AccountStatus.Deleted);

        if (acc is null)
            return new FailureResult { Message = $"Not Found Account has id:{id}" };

        if (!req.OldPassword.ValidatePassword(acc.Password))
            return new FailureResult { Message = $"The Old Password is wrong" };

        if (string.IsNullOrEmpty(req.NewPassword))
            return new FailureResult { Message = $"Password is null empty" };

        acc.Password = req.NewPassword.HashPassword();

        await _context.SaveChangesAsync();

        return new SuccessResult { Message = "Update Password Success" };
    }

    public async Task<BaseResult> ToggleLockAsync(int id)
    {
        var acc = _context.Accounts.FirstOrDefault(e => e.Id == id && e.Status != AccountStatus.Deleted);

        if (acc is null)
            return new FailureResult { Message = $"Not Found Account has id:{id}" };

        acc.Status = acc.Status == AccountStatus.Activate ? AccountStatus.Locked : AccountStatus.Activate;
        await _context.SaveChangesAsync();

        var result = new SuccessResult
        {
            Message = acc.Status == AccountStatus.Activate
                ? "Enable Account Success"
                : "Disable Account Success"
        };

        return result;
    }

    public async Task<BaseResult> DeleteAsync(int id)
    {
        var acc = _context.Accounts.FirstOrDefault(e => e.Id == id && e.Status != AccountStatus.Deleted);

        if (acc is null)
            return new FailureResult { Message = $"Not Found Account has id:{id}" };

        acc.Status = AccountStatus.Deleted;
        await _context.SaveChangesAsync();


        return new SuccessResult { Message = "Xo" };
    }
}