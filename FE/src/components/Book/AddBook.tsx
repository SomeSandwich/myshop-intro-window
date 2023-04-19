import React from "react";
import MultiSelect from "@/components/ReactNPM/MultitySelect";
import "./styles/AddBook.scss";
import { useAppSelector } from "@/Hooks/apphooks";
export default function AddBook() {
    const listCate = useAppSelector(state=>state.cate.listCate)
    const isLoading = useAppSelector(state=>state.cate.isLoading)
    return (
        <div className="order-form-1">
            <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
                <h2 className="h5 mb-3 mb-lg-0">
                    <a className="text-muted">
                        <i className="bi bi-arrow-left-square me-2" />
                    </a>
                    Import Books
                </h2>
                <div className="hstack gap-3">
                    <button className="btn btn-success btn-sm btn-icon-text">
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
                            <input type="file" />
                        </div>
                    </div>
                </div>
            </div>
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
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Tác giả
                                        </label>
                                        <input
                                            type="text"
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
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Giá tiền
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Thể loại
                                        </label>
                                        {
                                            isLoading ?
                                                <button className="buttonload">
                                                    <i className="fa fa-refresh fa-spin"></i>Loading
                                                </button> :
                                                <select className="custom-select">
                                                    <option selected>Open this select menu</option>
                                                    {listCate.map(cate => {
                                                        return <option value={cate.id.toString()}>{cate.description}</option>
                                                    })}
                                                </select>
                                        }
                                        {/* <MultiSelectCategory /> */}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Ngày xuất bản
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Số lượng
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Num of pages
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Cover type
                                        </label>
                                        <input
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
                            <h3 className="h6">Image</h3>
                            <input className="form-control" type="file" />
                        </div>
                    </div>
                    {/* Notes */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="h6">Description</h3>
                            <textarea
                                className="form-control"
                                rows={3}
                                defaultValue={""}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
