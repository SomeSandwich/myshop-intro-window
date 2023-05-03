import React, { useState } from "react";
import MultiSelect from "@/components/ReactNPM/MultitySelect";
import "./styles/AddBook.scss";
import { AddBookWithForm } from "@/interfaces/bookDetail";
import { useAppSelector } from "@/Hooks/apphooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axiosClient from "@/Axios/AxiosClient";
import { Link } from "react-router-dom";
interface FormImportExcel {
    excelFile: File | null;
}

export default function AddBook() {
    // Import excel
    const [FormImportExcel, setFormImportExcel] = useState<FormImportExcel>({
        excelFile: null,
    });

    const handleFileExcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.target.files;
        if (data && data.length > 0) {
            setFormImportExcel({
                ...FormImportExcel,
                excelFile: data[0],
            });
        }
    };

    const handleFormImportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!FormImportExcel.excelFile) {
            notification("Please choose file", Notification.Warn);
            return;
        }

        const formData = new FormData();
        formData.append("File", FormImportExcel.excelFile as Blob);

        axiosClient
            .post("/import", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.data.status == "Success") {
                    notification(res.data.message, Notification.Success);
                } else {
                    notification("Add book error", Notification.Error);
                }
            })
            .catch((err) => {
                console.log(err);
                notification("Add book error", Notification.Error);
            });

        // api
    };

    // Add book
    const [FormAddBook, setFormAddBook] = useState<AddBookWithForm>(
        {} as AddBookWithForm
    );

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
        console.log(FormAddBook);
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
            notification("Please input author", Notification.Warn);
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
            notification("Please input num pages", Notification.Warn);
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
        } else if (!FormAddBook.originalPrice) {
            notification("Please input original price", Notification.Warn);
            return;
        } else if (!FormAddBook.discount) {
            notification("Please input discount", Notification.Warn);
            return;
        }

        const formData = new FormData();

        formData.append("Title", FormAddBook.title);
        formData.append("Author", FormAddBook.author);
        formData.append("Publisher", FormAddBook.publisher);
        formData.append("PublicationDate", FormAddBook.publicationDate);
        formData.append("CoverType", FormAddBook.coverType);
        formData.append("NumPages", FormAddBook.numPages as unknown as string);
        formData.append("Price", FormAddBook.price as unknown as string);
        formData.append("Quantity", FormAddBook.quantity as unknown as string);
        formData.append("MediaFiles", FormAddBook.mediaPath);
        formData.append("Cost", FormAddBook.originalPrice as unknown as string);
        formData.append("Discount", FormAddBook.discount as unknown as string);
        formData.append(
            "categoryId",
            FormAddBook.categoryId as unknown as string
        );
        formData.append("Description", FormAddBook.description);

        // fetch("https://myshop.hieucckha.me/api/v1/product", {
        //     mode: "no-cors",
        //     method: "POST",
        //     // headers: { "Content-Type": "multipart/form-data" },
        //     body: formData,
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         if (data.message == "Success") {
        //             notification("Thêm sách thành công", Notification.Success);
        //         } else {
        //             notification("Thêm sách thất bại", Notification.Error);
        //         }
        //     });

        axiosClient
            .post("/product", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message == "Success") {
                    notification("Add book success", Notification.Success);
                } else {
                    notification("Add book error", Notification.Error);
                }
            })
            .catch((err) => {
                console.log(err);
                notification("Add book error", Notification.Error);
            });
    };

    // api

    const listCate = useAppSelector((state) => state.cate.listCate);
    const isLoading = useAppSelector((state) => state.cate.isLoading);
    return (
        <div className="order-form-1">
            <ToastContainer />
            <form onSubmit={handleFormImportSubmit}>
                <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
                    <h2 className="h5 mb-3 mb-lg-0">
                        <a className="text-muted">
                            <i className="bi bi-arrow-left-square me-2" />
                        </a>
                        Import Books &nbsp;
                        <button
                            data-bs-toggle="tooltip"
                            data-bs-placement="Tải về template"
                            title="Tải về template"
                            type="button"
                            className="btn btn-success btn-download"
                        >
                            <Link
                                to="/assects/template/templateExcel.xlsx"
                                target="_blank"
                                download
                            >
                                <i className="fa fa-download me-2" />
                            </Link>
                        </button>
                    </h2>
                    <div className="hstack gap-3">
                        <button
                            type="submit"
                            className="btn btn-success btn-sm btn-icon-text"
                        >
                            <i className="bi bi-save" />
                            <span className="text">Save</span>
                        </button>
                    </div>
                </div>
                <div className="row">
                    {/* Left side */}
                    <div className="col-lg-12">
                        {/* Basic information */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <input
                                    type="file"
                                    className="excel"
                                    onChange={handleFileExcelChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form onSubmit={handleFormAddBookSubmit}>
                <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
                    <h2 className="h5 mb-3 mb-lg-0">
                        <a className="text-muted">
                            <i className="bi bi-arrow-left-square me-2" />
                        </a>
                        Create new Book
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
                                                Author
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
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
                                                Publication Date{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                name="publicationDate"
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
                                                Quantity
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
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
                                                Cover Type
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
                                            >
                                                <option selected>
                                                    Open this select menu
                                                </option>
                                                <option value="0">
                                                    Hard cover
                                                </option>
                                                <option value="1">
                                                    Paper back
                                                </option>
                                                <option value="2">
                                                    Folding Cover
                                                </option>
                                                <option value="3">Combo</option>
                                                <option value="4">Box</option>
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
                                                Giá gốc{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                name="originalPrice"
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
                                                Discount{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
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
export enum Notification {
    Warn,
    Success,
    Error,
}
export const notification = (message: string, type: Notification) => {
    if (type == Notification.Warn) {
        toast.warn(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (type == Notification.Success) {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (type == Notification.Error) {
        toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
};
