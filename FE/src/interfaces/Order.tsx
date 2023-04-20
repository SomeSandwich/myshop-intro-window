export interface Order{
    id: Number,
    total: Number,
    status: string,
    createAt: string;
    updateAt: string;
    customerId: Number
}
export interface OrderDetail{
    orderId: Number,
    productId: Number,
    discount: Number,
    quantily: Number,
    UnitPrice: Number
}
export interface IOrderDetailProduct{
    productId: Number,
    title?: string,
    quantity: Number,
}