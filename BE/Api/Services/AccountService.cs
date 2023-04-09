using Api.Context;
using Api.Context.Constants.Enums;
using Api.Context.Entities;
using Api.Types;
using Api.Types.Mapping;
using Api.Types.Objects;
using Api.Types.Results;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IAccountService
{
    Task<IEnumerable<AccountRes>> GetAsync();
    Task<AccountRes> GetAsync(int id);

    Task<int> CreateAsync(CreateAccountReq req);

    Task<bool> UpdateAsync(int id, UpdateAccountReq req);
    Task<BaseResult> UpdatePasswordAsync(int id, string password);
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

    public async Task<bool> UpdateAsync(int id, UpdateAccountReq req)
    {
        var acc = _context.Accounts.FirstOrDefault(e => e.Id == id && e.Status != AccountStatus.Deleted);

        if (acc is null)
            return false;

        acc.Username = string.IsNullOrEmpty(req.Username) ? acc.Username : req.Username;
        acc.Email = string.IsNullOrEmpty(req.Email) ? acc.Email : req.Email;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<BaseResult> UpdatePasswordAsync(int id, string password)
    {
        var acc = _context.Accounts.FirstOrDefault(e => e.Id == id && e.Status != AccountStatus.Deleted);

        if (acc is null)
            return new FailureResult { Message = "Cập nhật mật khẩu thất bại" };

        acc.Password = password;

        await _context.SaveChangesAsync();


        return new SuccessResult { Message = "Cập nhật mật khẩu thành công" };
    }

    public async Task<BaseResult> ToggleLockAsync(int id)
    {
        var acc = _context.Accounts.FirstOrDefault(e => e.Id == id && e.Status != AccountStatus.Deleted);

        if (acc is null)
            return new FailureResult { Message = $"Không tồn tại accountId: {id}" };

        acc.Status = acc.Status == AccountStatus.Activate ? AccountStatus.Locked : AccountStatus.Activate;
        await _context.SaveChangesAsync();

        var result = new SuccessResult
        {
            Message = acc.Status == AccountStatus.Activate
                ? "Kích hoạt tài khoản thành công"
                : "Khoá tài khoản thành công"
        };

        return result;
    }

    public async Task<BaseResult> DeleteAsync(int id)
    {
        var acc = _context.Accounts.FirstOrDefault(e => e.Id == id && e.Status != AccountStatus.Deleted);

        if (acc is null)
            return new FailureResult { Message = $"Không tồn tại accountId: {id}" };

        acc.Status = AccountStatus.Deleted;
        await _context.SaveChangesAsync();


        return new SuccessResult { Message = "Xo" };
    }
}