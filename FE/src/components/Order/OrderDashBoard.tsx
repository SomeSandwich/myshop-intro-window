import { useAppDispatch, useAppSelector } from "@/Hooks/apphooks";
import { IOrderDetailProduct } from "@/interfaces/Order";
import { Book } from "@/interfaces/bookDetail";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import {
  addProductToCurrentOrder,
  removeProductToCurrentOrder,
  resetProductinOrder,
} from "./OrderSlice";
import { useNavigate } from "react-router-dom";
import { Genre } from "@/interfaces/Genre";
import OrderList from "./OrderList";
import { NumericFormat } from "react-number-format";

export default function OrderDashBoard() {
  const listBook = useAppSelector(
    (state: RootState) => state.book.listAllBook
  );
  const listProduct = useAppSelector(
    (state: RootState) => state.order.currentOrder
  );
  const [books, setBooks] = useState<IOrderDetailProduct[]>(listProduct);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log("boook");
  console.log(books);

  console.log(getDetailBook(books, listBook));
  const handleCreateNewOrder = ()=>{
    dispatch(resetProductinOrder(""));
    navigate("/order/add");
  }
  const HandleDelete = (id: Number) => {
    if (id) {
      dispatch(removeProductToCurrentOrder({ id }));
    }
  };
  useEffect(() => {
    console.log("change");
    console.log(listProduct);
    const temp = getDetailBook(listProduct, listBook);
    setBooks(temp);
  }, [listProduct]);

  return (
    <div className="order-dashboard">
      <div className="row">
        <button onClick={() => {
          handleCreateNewOrder()
        }} className="pt-1 pl-1 pr-1 pb-1 btn btn-info text-light ">Create New</button>
      </div>
      <div className="row product-detail-box-dashboard">
        <div className='row'>
          <table className="table">
            <thead style={{ display: "block" }}>
              <tr style={{ backgroundColor: "#3f897d42" }}>
                <th scope="col" style={{ width: "500px" }}>Tên sách</th>
                <th scope="col" style={{ width: widthColumn_detail }}>Giá</th>
                <th scope="col" style={{ width: widthColumn_detail }}>Số Lượng</th>
                <th scope="col" style={{ width: widthColumn_detail }}>Thành tiền</th>
                <th scope="col" style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody className='body-table-detail-box'>
              {
                books.map(book => {
                  return <ProductDetail product={book} handleDelete={HandleDelete} key={book.productId.toString()} />;
                })
              }
            </tbody>
          </table>
        </div>

      </div>
      <div className='row d-flex justify-content-end '>
        <button onClick={() => {
          navigate("/order/add");
        }} className="pt-1 pl-1 pr-1 pb-1 btn btn-info text-light">Create With Current</button>
      </div>
      <OrderList />
    </div>
  );
}
export const getDetailBook = (
  books: IOrderDetailProduct[],
  listbook: Book[]
) => {
  const bookClone: IOrderDetailProduct[] = [];
  books.forEach((book, index, theArray) => {
    const indexinListAll = listbook.findIndex(
      (e) => e.id == book.productId
    );
    var subbook = JSON.parse(JSON.stringify(book));
    if (indexinListAll >= 0) {
      const newTitle = listbook[indexinListAll].title;
      const price = listbook[indexinListAll].price;
      const discount = listbook[indexinListAll].discount;

      subbook.title = JSON.parse(JSON.stringify(newTitle));
      subbook.unitPrice = JSON.parse(JSON.stringify(price));
      subbook.unitPrice =
        (JSON.parse(JSON.stringify(price)) *
          (100 - JSON.parse(JSON.stringify(discount)))) /
        100;
      subbook.discount = JSON.parse(JSON.stringify(discount));
      // theArray[index] = {...book,title:listbook[indexinListAll].title}
    }
    bookClone.push(subbook);
  });
  return bookClone;
};
const ProductDetail = (props: { product: IOrderDetailProduct, handleDelete: Function }) => {
  return (
    <tr>
      <th scope="row" style={{ width: "500px" }}>{props.product.title} </th>
      <td style={{ width: widthColumn_detail }}>
        <NumericFormat
          displayType="text"
          value={props.product.unitPrice?.toString()}
          thousandSeparator={true}
          suffix="đ"
        />
      </td>
      <td style={{ width: widthColumn_detail }}>{props.product.quantity}</td>
      <td style={{ width: widthColumn_detail }}>
        <NumericFormat
          displayType="text"
          value={(props.product.unitPrice * props.product.quantity)}
          thousandSeparator={true}
          suffix="đ"
        />
      </td>
      <td>
        <span onClick={() => {
          props.handleDelete(props.product.productId)
        }}>
          <button className='add-product-btn' >
            <i className="fa-solid fa-trash"></i>
          </button>
        </span>
      </td>
    </tr>
  )
}
const widthColumn_detail = "120px"