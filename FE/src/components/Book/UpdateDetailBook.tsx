import React, { useEffect, useState } from "react";
import { AddBookWithForm } from "@/interfaces/bookDetail";
import "./styles/AddBook.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/Hooks/apphooks";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "@/Axios/AxiosClient";
import { GetDetailBookService } from "@/services/book.service";
import moment from "moment";
import { Notificatrion, notification } from "./AddBook";

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
            console.log(files[0]);
            setFormAddBook({ ...FormAddBook, mediaPath: files[0] });
        }
    };

    const handleFormAddBookChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormAddBook({ ...FormAddBook, [name]: value });
    };

    const handleFormAddBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //validate

        if (!FormAddBook.mediaPath) {
            notification("Vui lòng chọn hình ảnh", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.categoryId) {
            notification("Vui lòng chọn thể loại sách", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.title) {
            notification("Vui lòng nhập tên sách", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.author) {
            notification("Vui lòng nhập tên tác giả", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.publisher) {
            notification("Vui lòng nhập tên tác giả", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.publicationDate) {
            notification("Vui lòng chọn ngày phát hành", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.coverType) {
            notification("Vui lòng chọn loại bìa", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.numPages) {
            notification("Vui lòng nhập số trang", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.price) {
            notification("Vui lòng nhập giá tiền", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.quantity) {
            notification("Vui lòng nhập số lượng", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.description) {
            notification("Vui lòng nhập mô tả", Notificatrion.Warn);
            return;
        } else if (!FormAddBook.discount) {
            notification("Vui lòng nhập giảm giá", Notificatrion.Warn);
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

        axiosClient
            .patch("/product/" + id, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message == "Success") {
                    notification("Thêm sách thành công", Notificatrion.Success);
                    setTimeout(() => {
                        navigate("/home");
                    }, 2000);
                } else {
                    notification("Thêm sách thất bại", Notificatrion.Error);
                }
            })
            .catch((err) => {
                console.log(err);
                notification("Thêm sách thất bại", Notificatrion.Error);
            });
    };

    // api
    console.log(FormAddBook.publicationDate);

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
                        Cập nhật thông tin sách
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
                                                Tên sách
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
                                                Tác giả{" "}
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
                                                Nhà phát hành
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
                                                Giá tiền{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={FormAddBook.price}
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
                                                Thể loại{" "}
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
                                                        FormAddBook.categoryId
                                                    }
                                                    name="categoryId"
                                                >
                                                    <option selected>
                                                        Open this select menu
                                                    </option>
                                                    {listCate.map((cate) => {
                                                        return (
                                                            <option
                                                                value={cate.id}
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
                                                Ngày xuất bản{" "}
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
                                                Số lượng{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={FormAddBook.quantity}
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
                                                Loại bìa{" "}
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
                                                    Bìa mềm
                                                </option>
                                                <option value="Paperback">
                                                    Bìa cứng
                                                </option>
                                                <option value="FoldingCover">
                                                    Bìa gấp
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Tổng số trang{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={FormAddBook.numPages}
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
                                                Khuyến mãi %
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                value={FormAddBook.discount}
                                                name="discount"
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