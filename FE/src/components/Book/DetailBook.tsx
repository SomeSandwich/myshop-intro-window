import React from "react";
import { NumericFormat } from "react-number-format";
import { Navigate, useNavigate } from "react-router-dom";
import { Tab } from "semantic-ui-react";
import "./styles/DetailBook.scss";
export default function () {
    const bookDetail = {
        id: "1",
        title: "Sách 1",
        author: "Nguyễn Văn A",
        price: 100000,
        description: "Sách hay",
        mediaPath:
            "https://react.semantic-ui.com/images/wireframe/square-image.png",
        quantity: 10,
        numPages: 100,
        publisher: "NXB A",
        publishDate: "2021-01-01",
        coverType: "Bìa mềm",
        discount: 10,
        categoryDescription: "Sách văn học",
        updateAt: "2021-01-01",
    };
    const navigate = useNavigate();
    const handleUpdateBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/books/update/" + bookDetail.id);
    };
    return (
        <div className="card">
            <div className="container-fliud">
                <div className="wrapper row">
                    <div className="preview col-md-6">
                        <div className="preview-pic tab-content">
                            <div className="tab-pane active" id="pic-1">
                                <img
                                    src={
                                        bookDetail.mediaPath
                                            ? bookDetail.mediaPath
                                            : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                                    }
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
                        <h3 className="product-title">{bookDetail.title}</h3>
                        <div className="rating">
                            {/* <div className="stars">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div> */}
                            <span className="review-no">
                                <strong>Tác giả: {bookDetail.author}</strong>
                            </span>
                        </div>
                        <p className="product-description">
                            {bookDetail.description}
                        </p>
                        <div className="d-flex bd-highlight">
                            <h6 className="p-1 flex-fill bd-highlight">
                                Giá bán:{" "}
                                <strong>
                                    <NumericFormat
                                        displayType="text"
                                        value={bookDetail.price}
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
                                        value={
                                            bookDetail.price -
                                            (bookDetail.discount *
                                                bookDetail.price) /
                                                100
                                        }
                                        thousandSeparator={true}
                                        suffix="đ"
                                    />
                                </strong>
                            </h6>
                        </div>
                        <div className="d-flex bd-highlight">
                            <p className="p-1 flex-fill bd-highlight">
                                SL Hiện tại:{" "}
                                <strong>{bookDetail.quantity}</strong>
                            </p>
                            <p className="p-1 flex-fill bd-highlight">
                                Số trang: <strong>{bookDetail.numPages}</strong>
                            </p>
                        </div>
                        <div className="d-flex bd-highlight">
                            <p className="p-1 flex-fill bd-highlight">
                                Ngày xuất bản:{" "}
                                <strong>{bookDetail.publishDate}</strong>
                            </p>
                            <p className="p-1 flex-fill bd-highlight">
                                Ngày cập nhật:{" "}
                                <strong>{bookDetail.updateAt}</strong>
                            </p>
                        </div>
                        <div className="d-flex bd-highlight">
                            <p className="p-1 flex-fill bd-highlight">
                                Nhà xuất bản:{" "}
                                <strong>{bookDetail.publisher}</strong>
                            </p>
                            <p className="p-1 flex-fill bd-highlight">
                                Thể loại:{" "}
                                <strong>
                                    {bookDetail.categoryDescription}
                                </strong>
                            </p>
                        </div>

                        <div className="action">
                            <button
                                className="add-to-cart btn btn-default"
                                type="button"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
