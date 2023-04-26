import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Tab } from "semantic-ui-react";
import "./styles/DetailBook.scss";
import { ToastContainer, toast } from "react-toastify";
import {
    GetDetailBookService,
    DeleteBookService,
} from "@/services/book.service";
import Modal from 'react-bootstrap/Modal';
import { Book } from "@/interfaces/bookDetail";
import { notification } from "./AddBook";
import { Button } from "react-bootstrap";
import { IOrderDetailProduct } from "@/interfaces/Order";
import { addProductToCurrentOrder } from "../Order/OrderSlice";
import { useAppDispatch } from "@/Hooks/apphooks";
export default function () {
    const { id } = useParams();
    if (!id) return <></>;
    const quantityRef = React.useRef<HTMLInputElement>(null);
    const [show, setShow] = useState(false);
    
    const [curBook, setCurBook] = useState<Book>();
    const navigate = useNavigate();
    const handleUpdateBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/books/update/" + id);
    };
    const dispatch = useAppDispatch()
    const handleShow = () => {  
        setShow(true)
    };
    const handleClose = () => setShow(false);
    const handleAddNewProduct =async ()=>{
        // if(nameRef.current &&  phoneRef.current){
        //     const newCustomer: InputCustomer= {
        //         name: nameRef.current?.value,
        //         phoneNumber: phoneRef.current?.value
        //     }
        //     console.log(newCustomer)
        //     await dispatch(AddCustomerThunk(newCustomer))
            
        // }
        if(quantityRef.current && curBook){
            const newProduct: IOrderDetailProduct = {
                productId: parseInt(id),
                quantity: +quantityRef.current?.value,
                title: curBook?.title
            }
            console.log(newProduct)
            notification("Add New Product into Order Success", Notification.Success)
            dispatch(addProductToCurrentOrder(newProduct))
        }
        setShow(false);
    }
    const handleDeleteBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await DeleteBookService(id).then((res) => {
            if (res.message == "Success") {
                notification("Xóa sách thành công", Notification.Success);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else {
                notification("Xóa sách thất bại", Notification.Error);
            }
        });
    };
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        notification("Thêm vào giỏ hàng thành công", Notification.Success);
    };

    useEffect(() => {
        const getDetail = async () => {
            const respone = await GetDetailBookService(id).catch((err) => {
                navigate("/*");
            });
            setCurBook(respone);
        };
        getDetail();
    }, []);
    console.log(curBook?.mediaPath);
    console.log("https://s3.hieucckha.me/public/" + curBook?.mediaPath[0]);
    if(!curBook) return <></>
    return (
        <div className="detail-book-1">
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add To Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Quantity: <input ref={quantityRef} type="number" min={1} max={curBook.quantity.toString()} className="form-control" required id="inputPhone" placeholder={"Quantity"} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddNewProduct}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row d-flex justify-content-start">
                <button className='btn btn-primary' onClick={()=>{navigate("/home")}} > Back</button>
            </div>
            <div className="card">
                {curBook ? (
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">
                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1">
                                        <img
                                            // src={curBook.mediaPath}
                                            src={
                                                curBook.mediaPath[0]
                                                    ? "https://s3.hieucckha.me/public/" +
                                                      curBook.mediaPath[0]
                                                    : "https://www.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg"
                                            }
                                            alt={curBook.title}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src =
                                                    "https://www.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg";
                                            }}
                                        />
                                    </div>
                                    {/* <div className="tab-pane" id="pic-2">
                                <img src="http://placekitten.com/400/252" />
                                </div>
                                <div className="tab-pane" id="pic-3">
                                <img src="http://placekitten.com/400/252" />
                                </div>
                                <div className="tab-pane" id="pic-4">
                                <img src="http://placekitten.com/400/252" />
                                </div>
                                <div className="tab-pane" id="pic-5">
                                <img src="http://placekitten.com/400/252" />
                            </div> */}
                                </div>
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title">
                                    {curBook.title}
                                </h3>
                                <div className="rating">
                                    {/* <div className="stars">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div> */}
                                    <span className="review-no">
                                        <strong>
                                            Tác giả: {curBook.author}
                                        </strong>
                                    </span>
                                </div>
                                <p className="product-description">
                                    {curBook.description}
                                </p>
                                <div className="d-flex bd-highlight">
                                    <h6 className="p-1 flex-fill bd-highlight">
                                        Giá bán:{" "}
                                        <strong>
                                            <NumericFormat
                                                displayType="text"
                                                value={curBook.price.toString()}
                                                thousandSeparator={true}
                                                suffix="đ"
                                            />{" "}
                                        </strong>
                                    </h6>
                                    <h6 className="p-1 flex-fill bd-highlight">
                                        Giá khuyến mãi:
                                        <strong>
                                            <NumericFormat
                                                displayType="text"
                                                value={(
                                                    curBook.price -
                                                    (curBook.discount *
                                                        curBook.price) /
                                                        100
                                                ).toString()}
                                                thousandSeparator={true}
                                                suffix="đ"
                                            />
                                        </strong>
                                    </h6>
                                </div>
                                <div className="d-flex bd-highlight">
                                    <p className="p-1 flex-fill bd-highlight">
                                        SL Hiện tại:{" "}
                                        <strong>
                                            {curBook.quantity.toString()}
                                        </strong>
                                    </p>
                                    <p className="p-1 flex-fill bd-highlight">
                                        Số trang:{" "}
                                        <strong>
                                            {curBook.numPages.toString()}
                                        </strong>
                                    </p>
                                </div>
                                <div className="d-flex bd-highlight">
                                    <p className="p-1 flex-fill bd-highlight">
                                        Ngày xuất bản:{" "}
                                        <strong>
                                            {curBook.publicationDate}
                                        </strong>
                                    </p>
                                    <p className="p-1 flex-fill bd-highlight">
                                        Ngày cập nhật:{" "}
                                        <strong>{curBook.updateAt}</strong>
                                    </p>
                                </div>
                                <div className="d-flex bd-highlight">
                                    <p className="p-1 flex-fill bd-highlight">
                                        Nhà xuất bản:{" "}
                                        <strong>{curBook.publisher}</strong>
                                    </p>
                                    <p className="p-1 flex-fill bd-highlight">
                                        Thể loại:{" "}
                                        <strong>
                                            {curBook.categoryDescription}
                                        </strong>
                                    </p>
                                </div>

                                <div className="action">
                                    <button
                                        className="add-to-cart btn btn-default"
                                        type="button"
                                        onClick={handleShow}
                                    >
                                        Add to cart
                                    </button>

                                    <button
                                        className="add-to-cart btn btn-default"
                                        type="button"
                                        onClick={handleUpdateBtnClick}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="add-to-cart btn btn-default"
                                        type="button"
                                        onClick={handleDeleteBook}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

enum Notification {
    Warn,
    Success,
    Error,
}
// const notification = (message: string, type: Notification) => {
//     if (type == Notification.Warn) {
//         toast.warn(message, {
//             position: "top-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//     } else if (type == Notification.Success) {
//         toast.success(message, {
//             position: "top-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//     } else if (type == Notification.Error) {
//         toast.error(message, {
//             position: "top-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//     }
// };
