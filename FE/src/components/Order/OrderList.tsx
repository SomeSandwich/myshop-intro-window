import { OrderDetail, OrderDetailList, tmplist } from "@/interfaces/Order";
import React, { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { getAllOrderService } from "@/services/order.service";
import moment from "moment";
export default function OrderList() {
    const [orderDetail, setOrderDetail] = React.useState<OrderDetailList[]>([]);

    React.useEffect(() => {
        getAllOrderService().then((res) => {
            console.log(res);
            const tmp: OrderDetailList[] = [];
            res.data.forEach((ele: tmplist) => {
                tmp.push({
                    id: ele.id,
                    createdAt: moment(ele.createAt).format("DD-MM-YYYY"),
                    price: ele.total,
                    customerName: ele.customer.name,
                });
            });
            setOrderDetail(tmp); // Update state with the processed data
        });
    }, []);

    // useEffect(() => {
    //     setOrderDetail([
    //         {
    //             id: 1,
    //             createdAt: "2021-08-10",
    //             customerName: "Nguyễn Văn A",
    //             price: 100000,
    //         },
    //         {
    //             id: 2,
    //             createdAt: "2021-08-10",
    //             customerName: "Nguyễn Văn B",
    //             price: 100000,
    //         },
    //         {
    //             id: 3,
    //             createdAt: "2021-08-10",
    //             customerName: "Nguyễn Văn C",
    //             price: 100000,
    //         },
    //     ]);
    // }, []);

    return (
        <div className="row">
            <table className="table">
                <thead style={{ display: "block" }}>
                    <tr>
                        <th
                            scope="col"
                            style={{
                                width: 500,
                            }}
                        >
                            <h5 style={{ fontWeight: 4 }}>Đơn hàng</h5>
                        </th>
                    </tr>
                    <tr style={{ backgroundColor: "#3f897d42" }}>
                        <th scope="col" style={{ width: 500 }}>
                            Mã đơn hàng
                        </th>
                        <th scope="col" style={{ width: widthColumn_detail }}>
                            Ngày đặt
                        </th>
                        <th scope="col" style={{ width: widthColumn_detail }}>
                            Tên khách hàng
                        </th>
                        <th scope="col" style={{ width: widthColumn_detail }}>
                            Tổng tiền
                        </th>
                    </tr>
                </thead>
                <tbody className="body-table-detail-box">
                    {orderDetail.map((order) => {
                        return (
                            <ProductInfor
                                product={order}
                                key={order.id.toString()}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

const widthColumn_detail = "120px";

const ProductInfor = (props: { product: OrderDetailList }) => {
    return (
        <tr>
            <td style={{ width: 500 }}>{props.product.id}</td>
            <td style={{ width: widthColumn_detail }}>
                {props.product.createdAt?.toString()}
            </td>
            <td style={{ width: widthColumn_detail }}>
                {props.product.customerName.toString()}
            </td>
            <td style={{ width: widthColumn_detail }}>
                <NumericFormat
                    displayType="text"
                    value={props.product.price.toString()}
                    thousandSeparator={true}
                    suffix="đ"
                />
            </td>
        </tr>
    );
};
