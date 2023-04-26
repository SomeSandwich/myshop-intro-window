export interface Order {
    id: Number;
    total: Number;
    status: string;
    createAt: string;
    updateAt: string;
    customerId: Number;
}
export interface OrderDetail {
    orderId: Number;
    productId: Number;
    discount: Number;
    quantily: Number;
    UnitPrice: Number;
}
export interface IOrderDetailProduct {
    productId: Number;
    title?: string;
    price?: Number;
    discount?: Number;
    uniPrice?: Number;
    quantity: Number;
}

export interface OrderDetailList {
    id: Number;
    createdAt: String;
    price: Number;
    customerName: String;
}

export interface tmplist {
    id: Number;
    total: Number;
    status: String;
    createAt: String;
    updateAt: String;
    customerId: Number;
    sellerId: Number;
    customer: {
        id: Number;
        name: String;
        phoneNumber: String;
        joinDate: String;
        orders: null;
    };
    orderDetails: {
        productId: Number;
        cost: Number;
        unitPrice: Number;
        discount: Number;
        quantity: Number;
    };
}
