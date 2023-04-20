import React, { useState } from "react";
import MultiSelect from "@/components/ReactNPM/MultitySelect";
import "./styles/AddBook.scss";
import { AddBookWithForm } from "@/interfaces/bookDetail";
import { useAppSelector } from "@/Hooks/apphooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            console.log(data);
            setFormImportExcel({
                ...FormImportExcel,
                excelFile: data[0],
            });
        }
    };

    const handleFormImportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("excelFile", FormImportExcel.excelFile as Blob);
        console.log(formData);

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
            toast.warn("Vui lòng chọn hình ảnh", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        } else if (!FormAddBook.categoryId) {
            toast.warn("Vui lòng chọn thể loại sách", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        } else if (!FormAddBook.title) {
            toast.warn("Vui lòng nhập tên sách", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        } else if (!FormAddBook.author) {
            toast.warn("Vui lòng nhập tên tác giả", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        } else if (!FormAddBook.publisher) {
            toast.warn("Vui lòng nhập nhà phát hành", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        } else if (!FormAddBook.publicationDate) {
            toast.warn("Vui lòng chọn ngày phát hành ", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        } else if (!FormAddBook.coverType) {
            toast.warn("Vui lòng chọn loại bìa ", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        } else if (!FormAddBook.numPages) {
            toast.warn("Vui lòng nhập số trang ", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        } else if (!FormAddBook.price) {
            toast.warn("Vui lòng nhập giá tiền ", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        } else if (!FormAddBook.quantity) {
            toast.warn("Vui lòng nhập số lượng ", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        } else if (!FormAddBook.description) {
            toast.warn("Vui lòng nhập mô tả  ", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

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
        formData.append("mediaPath", FormAddBook.mediaPath as Blob);
        formData.append(
            "categoryId",
            FormAddBook.categoryId as unknown as string
        );
        formData.append("description", FormAddBook.description);

        console.log(formData);

        fetch("https://myshop.hieucckha.me/api/v1/product", {
            method: "POST",

            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.message == "Success") {
                    toast.success("Thêm sách thành công", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error("Thêm sách thất bại", {
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
            });

        // api
    };

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
                        Import Books
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
                                                Tên sách
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
                                                Tác giả{" "}
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
                                                Nhà phát hành
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
                                                Giá tiền{" "}
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
                                                Loại bìa{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                onChange={
                                                    handleFormAddBookChange
                                                }
                                                name="coverType"
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
