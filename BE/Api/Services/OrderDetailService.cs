using Api.Context;
using Api.Context.Entities;
using API.Types.Objects.OrderDetail;
using Api.Types.Results;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IOrderDetailService
{
    Task<BaseResult> AddAsync(int orderId, List<CreateOrderDetailReq> orderDetails);
}

public class OrderDetailService : IOrderDetailService
{
    private readonly MyShopDbContext _context;
    private readonly IMapper _mapper;

    public OrderDetailService(MyShopDbContext context, IMapper mapper)
    {
        _context = context;

        _mapper = mapper;
    }

    public async Task<BaseResult> AddAsync(int orderId, List<CreateOrderDetailReq> orderDetails)
    {
        var listAbc = _mapper.Map<List<CreateOrderDetailReq>, List<OrderDetail>>(orderDetails);

        foreach (var detail in listAbc)
        {
            _context.Entry(detail).State = EntityState.Detached;
            detail.OrderId = orderId;

            await _context.SaveChangesAsync();
        }

        return new SuccessResult();
    }
}