using Api.Context;
using Api.Context.Entities;
using Api.Types;
using Api.Types.Mapping;
using Api.Types.Objects;
using Api.Types.Results;
using AutoMapper;
using Bogus;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface ICustomerService
{
    Task<IEnumerable<CustomerRes>> GetAsync();
    Task<CustomerRes?> GetAsync(int id);
    Task<CustomerRes?> GetByPhoneNumber(string phoneNum);

    Task<int?> CreateAsync(CreateCustomerReq req);

    Task<BaseResult> UpdateAsync(int id, UpdateCustomerReq req);

    Task<BaseResult> DeleteAsync(int id);
}

public class CustomerService : ICustomerService
{
    private readonly MyShopDbContext _context;
    private readonly IMapper _mapper;

    public CustomerService(MyShopDbContext context)
    {
        _context = context;

        var config = new MapperConfiguration(opt => { opt.AddProfile<CustomerProfile>(); });
        _mapper = config.CreateMapper();
    }

    public async Task<IEnumerable<CustomerRes>> GetAsync()
    {
        var listCus = _context.Customers.AsEnumerable();

        return _mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerRes>>(listCus);
    }

    public async Task<CustomerRes?> GetAsync(int id)
    {
        var customer = _context.Customers
            .Include(e=>e.Orders)
            .FirstOrDefault(e => e.Id == id);

        return customer is null ? null : _mapper.Map<Customer, CustomerRes>(customer);
    }

    public async Task<CustomerRes?> GetByPhoneNumber(string phoneNum)
    {
        var customer = _context.Customers.FirstOrDefault(e => e.PhoneNumber == phoneNum);
        
        return customer is null ? null : _mapper.Map<Customer, CustomerRes>(customer);
    }

    public async Task<int?> CreateAsync(CreateCustomerReq req)
    {
        if (GetByPhoneNumber(req.PhoneNumber) is not null)
        {
            return null;
        }
        var customer = _mapper.Map<CreateCustomerReq, Customer>(req);
        customer.JoinDate = DateOnly.FromDateTime(DateTime.Now);

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return customer.Id;
    }

    public async Task<BaseResult> UpdateAsync(int id, UpdateCustomerReq req)
    {
        var customer = _context.Customers.FirstOrDefault(e => e.Id == id);
        if (customer is null)
            return new FailureResult { Message = $"Not found customerId: {id}" };
        
        if (GetByPhoneNumber(req.PhoneNumber) is not null)
            return new FailureResult { Message = $"Exists phone number {req.PhoneNumber}" };
        
        customer.PhoneNumber = req.PhoneNumber ?? customer.PhoneNumber;
        customer.Name = req.Name ?? customer.Name;

        await _context.SaveChangesAsync();

        return new SuccessResult();
    }

    public async Task<BaseResult> DeleteAsync(int id)
    {
        var customer = _context.Customers.FirstOrDefault(e => e.Id == id);
        if (customer is null)
            return new FailureResult { Message = $"Not found customerId: {id}" };

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();

        return new SuccessResult();
    }
}