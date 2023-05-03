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
import { useAppDispatch, useAppSelector } from "@/Hooks/apphooks";
import { getPotentialNumberProduct } from "../Order/AddOrder";
import { RootState } from "@/store";
export default function () {
    const { id } = useParams();
    if (!id) return <></>;
    const [isLoading,setIsLoading] = useState<boolean>(true)
    
    const listBook = useAppSelector((state: RootState) => state.book.listAllBook)
    const listProduct = useAppSelector((state: RootState) => state.order.currentOrder)
    const quantityRef = React.useRef<HTMLInputElement>(null);
    const [show, setShow] = useState(false);
    const [maxQuantity,setMaxQuantity] = useState(0);
    const [curBook, setCurBook] = useState<Book>();
    const navigate = useNavigate();
    const handleUpdateBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/books/update/" + id);
    };
    const dispatch = useAppDispatch()
    const handleShow = () => {  
        const potential = getPotentialNumberProduct(listBook,listProduct,+id)
        setMaxQuantity(pre=>+potential)
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
            if(+quantityRef.current?.value==0) {
                notification("Please select quantity at least 1",Notification.Warn)
            }else{
                const newProduct: IOrderDetailProduct = {
                    productId: parseInt(id),
                    quantity: +quantityRef.current?.value,
                    title: curBook?.title
                }
                
                if(+newProduct.quantity>maxQuantity){
                    notification(`Current Quatity has only ${maxQuantity}`,Notification.Warn)
                }else{
                    
                    notification("Add New Product Success", Notification.Success)
                    dispatch(addProductToCurrentOrder(newProduct))
                }
            }
            
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
    useEffect(()=>{
        setIsLoading(pre=>false)
    },[curBook])
    if(!curBook) return <></>
    
    return (
        <div className="detail-book-1">
            {
                isLoading==true?
                <><i className="fa fa-refresh fa-spin"></i>Loading</>:<></>
            }
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add To Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Quantity: <input ref={quantityRef} type="number" min={1} max={maxQuantity} className="form-control" required id="inputPhone" placeholder={"Quantity"} />
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
                                            Author: {curBook.author}
                                        </strong>
                                    </span>
                                </div>
                                <p className="product-description">
                                    {curBook.description}
                                </p>
                                <div className="d-flex bd-highlight">
                                    <h6 className="p-1 flex-fill bd-highlight">
                                        Price:{" "}
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
                                        Discount price: 
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
                                {curBook.cost? 
                                <div className="d-flex bd-highlight">
                                    <p className="p-1 flex-fill bd-highlight">
                                        Cost:{" "}
                                        <strong>{+curBook.cost}</strong>
                                    </p>
                                </div>:<></>}
                                <div className="d-flex bd-highlight">
                                    <p className="p-1 flex-fill bd-highlight">
                                        Quantity:{" "}
                                        <strong>
                                            {curBook.quantity.toString()}
                                        </strong>
                                    </p>
                                    <p className="p-1 flex-fill bd-highlight">
                                        Num page:{" "}
                                        <strong>
                                            {curBook.numPages.toString()}
                                        </strong>
                                    </p>
                                </div>
                                <div className="d-flex bd-highlight">
                                    <p className="p-1 flex-fill bd-highlight">
                                        Publication:{" "}
                                        <strong>
                                            {curBook.publicationDate}
                                        </strong>
                                    </p>
                                    <p className="p-1 flex-fill bd-highlight">
                                        Update:{" "}
                                        <strong>{curBook.updateAt}</strong>
                                    </p>
                                </div>
                                <div className="d-flex bd-highlight">
                                    <p className="p-1 flex-fill bd-highlight">
                                        Publisher:{" "}
                                        <strong>{curBook.publisher}</strong>
                                    </p>
                                    <p className="p-1 flex-fill bd-highlight">
                                        Categories:{" "}
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
