import React, { useEffect, useState } from "react";
import { AddBookWithForm } from "@/interfaces/bookDetail";
import "./styles/AddBook.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/Hooks/apphooks";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "@/Axios/AxiosClient";
import { GetDetailBookService } from "@/services/book.service";
import moment from "moment";
import { Notification, notification } from "./AddBook";

export default function UpdateDetailBook() {
    // Add book
    const { id } = useParams();
    if (!id) return <></>;
    const navigate = useNavigate();
    const [FormAddBook, setFormAddBook] = useState<AddBookWithForm>(
        {} as AddBookWithForm
    );

    useEffect(() => {
        const getDetail = async () => {
            const respone = await GetDetailBookService(id).catch((err) => {
                navigate("/*");
            });

            respone.publicationDate = moment(respone.publicationDate).format(
                "YYYY-MM-DD"
            );
            setFormAddBook(respone);
        };
        getDetail();
    }, []);

    const handleFileImgChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFormAddBook({ ...FormAddBook, mediaPath: files[0] });
        }
    };

    const handleFormAddBookChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormAddBook({ ...FormAddBook, [name]: value });
    };

    const handleFormAddBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //validate

        if (!FormAddBook.mediaPath) {
            notification("Please choose image", Notification.Warn);
            return;
        } else if (!FormAddBook.categoryId) {
            notification("Please select category", Notification.Warn);
            return;
        } else if (!FormAddBook.title) {
            notification("Please input title", Notification.Warn);
            return;
        } else if (!FormAddBook.author) {
            notification("Vui lòng nhập tên tác giả", Notification.Warn);
            return;
        } else if (!FormAddBook.publisher) {
            notification("Please input publisher", Notification.Warn);
            return;
        } else if (!FormAddBook.publicationDate) {
            notification("Please input publication date", Notification.Warn);
            return;
        } else if (!FormAddBook.coverType) {
            notification("Please input cover type", Notification.Warn);
            return;
        } else if (!FormAddBook.numPages) {
            notification("Please input cover type", Notification.Warn);
            return;
        } else if (!FormAddBook.price) {
            notification("Please input price", Notification.Warn);
            return;
        } else if (!FormAddBook.quantity) {
            notification("Please input quantity", Notification.Warn);
            return;
        } else if (!FormAddBook.description) {
            notification("Please input description", Notification.Warn);
            return;
        } else if (!FormAddBook.discount) {
            notification("Please input discount", Notification.Warn);
            return;
        } else if (!FormAddBook.cost) {
            notification("Please input original price", Notification.Warn);
            return;
        }

        const formData = new FormData();

        formData.append("title", FormAddBook.title);
        formData.append("author", FormAddBook.author);
        formData.append("publisher", FormAddBook.publisher);
        formData.append("publicationDate", FormAddBook.publicationDate);
        formData.append("coverType", FormAddBook.coverType);
        formData.append("numPages", FormAddBook.numPages as unknown as string);
        formData.append("price", FormAddBook.price as unknown as string);
        formData.append("quantity", FormAddBook.quantity as unknown as string);
        formData.append("MediaFiles", FormAddBook.mediaPath);
        formData.append(
            "categoryId",
            FormAddBook.categoryId as unknown as string
        );
        formData.append("description", FormAddBook.description);
        formData.append("discount", FormAddBook.discount as unknown as string);
        formData.append("cost", FormAddBook.cost as unknown as string);
        axiosClient
            .patch("/product/" + id, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message == "Success") {
                    notification("Add book success", Notification.Success);
                    setTimeout(() => {
                        navigate("/home");
                    }, 2000);
                } else {
                    notification("Add book error", Notification.Error);
                }
            })
            .catch((err) => {
                console.log(err);
                notification("Add book error", Notification.Error);
            });
    };

    const listCate = useAppSelector((state) => state.cate.listCate);
    const isLoading = useAppSelector((state) => state.cate.isLoading);
    return (
        <div className="order-form-1">
            <ToastContainer />

            <form onSubmit={handleFormAddBookSubmit}>
                <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
                    <h2 className="h5 mb-3 mb-lg-0">
                        <a className="text-muted">
                            <i className="bi bi-arrow-left-square me-2" />
                        </a>
                        Update book
                    </h2>
                    <div className="hstack gap-3">
                        <button className="btn btn-success btn-sm btn-icon-text">
                            <i className="bi bi-save" />{" "}
                            <span className="text">Save</span>
                        </button>
                    </div>
                </div>
                {/* Main content */}
                <div className="row">
                    {/* Left side */}
                    <div className="col-lg-8">
                        {/* Basic information */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Title
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={FormAddBook.title}
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                name="title"
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Author{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={FormAddBook.author}
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                type="text"
                                                name="author"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Publisher{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={FormAddBook.publisher}
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                type="text"
                                                name="publisher"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Price{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={+FormAddBook.price}
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                type="text"
                                                name="price"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Categories{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            {isLoading ? (
                                                <button className="buttonload">
                                                    <i className="fa fa-refresh fa-spin"></i>
                                                    Loading
                                                </button>
                                            ) : (
                                                <select
                                                    onChange={
                                                        handleFormAddBookChange
                                                    }
                                                    className="custom-select"
                                                    value={
                                                        +FormAddBook.categoryId
                                                    }
                                                    name="categoryId"
                                                >
                                                    <option selected>
                                                        Open this select menu
                                                    </option>
                                                    {listCate.map((cate) => {
                                                        return (
                                                            <option
                                                                value={+cate.id}
                                                            >
                                                                {
                                                                    cate.description
                                                                }
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            )}
                                            {/* <MultiSelectCategory /> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Publication Date{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                name="publicationDate"
                                                value={
                                                    FormAddBook.publicationDate
                                                }
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                type="date"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Quantity{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={+FormAddBook.quantity}
                                                name="quantity"
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Cover type{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                name="coverType"
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                className="custom-select"
                                                value={FormAddBook.coverType}
                                            >
                                                <option selected>
                                                    Open this select menu
                                                </option>
                                                <option value="Hardcover">
                                                    Hard cover
                                                </option>
                                                <option value="Paperback">
                                                    Paper back
                                                </option>
                                                <option value="FoldingCover">
                                                    Folding Cover
                                                </option>
                                                <option value="Combo">
                                                    Combo
                                                </option>
                                                <option value="Box">Box</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Total pages{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={+FormAddBook.numPages}
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                name="numPages"
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Discount %
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={+FormAddBook.discount}
                                                name="discount"
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Original Price{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={+FormAddBook.cost}
                                                name="cost"
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <br />

                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className="col-lg-4">
                        {/* Status */}

                        {/* Avatar */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="h6">
                                    Image <span className="text-danger">*</span>
                                </h3>
                                <input
                                    className="form-control"
                                    type="file"
                                    name="mediaPath"
                                    onChange={handleFileImgChange}
                                />
                            </div>
                        </div>
                        {/* Notes */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="h6">
                                    Description{" "}
                                    <span className="text-danger">*</span>
                                </h3>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    defaultValue={""}
                                    value={FormAddBook.description}
                                    onChange={handleFormAddBookChange}
                                    name="description"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
