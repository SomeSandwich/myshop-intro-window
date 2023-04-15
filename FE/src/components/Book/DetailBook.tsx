import React from "react";
import "./styles/DetailBook.scss";
export default function () {
    return (
        <section className="panel">
            <div className="panel-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="pro-img-details">
                            <img
                                src="https://www.bootdey.com/image/550x380/FFB6C1/000000"
                                className="img-fluid"
                                alt="Product Image"
                            />
                        </div>
                        <div className="pro-img-list">
                            <a href="#">
                                <img
                                    src="https://www.bootdey.com/image/115x100/87CEFA/000000"
                                    className="img-fluid"
                                    alt="Product Thumbnail"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://www.bootdey.com/image/115x100/FF7F50/000000"
                                    className="img-fluid"
                                    alt="Product Thumbnail"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://www.bootdey.com/image/115x100/20B2AA/000000"
                                    className="img-fluid"
                                    alt="Product Thumbnail"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://www.bootdey.com/image/120x100/20B2AA/000000"
                                    className="img-fluid"
                                    alt="Product Thumbnail"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4 className="pro-d-title">
                            <a href="#">Leopard Shirt Dress</a>
                        </h4>
                        <p>
                            Praesent ac condimentum felis. Nulla at nisl orci,
                            at dignissim dolor, The best product descriptions
                            address your ideal buyer directly and personally.
                            The best product descriptions address your ideal
                            buyer directly and personally.
                        </p>
                        <div className="product-meta">
                            <span className="posted_in">
                                <strong>Categories:</strong>
                                <a rel="tag" href="#">
                                    Jackets
                                </a>
                                ,
                                <a rel="tag" href="#">
                                    Men
                                </a>
                                ,
                                <a rel="tag" href="#">
                                    Shirts
                                </a>
                                ,
                                <a rel="tag" href="#">
                                    T-shirt
                                </a>
                                .
                            </span>
                            <span className="tagged_as">
                                <strong>Tags:</strong>
                                <a rel="tag" href="#">
                                    mens
                                </a>
                                ,
                                <a rel="tag" href="#">
                                    womens
                                </a>
                                .
                            </span>
                        </div>
                        <div className="m-bot15">
                            <strong>Price : </strong>
                            <span className="amount-old">$544</span>
                            <span className="pro-price"> $300.00</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                className="form-control quantity"
                            />
                        </div>
                        <p>
                            <button
                                className="btn btn-danger btn-round"
                                type="button"
                            >
                                <i className="fa fa-shopping-cart" /> Add to
                                Cart
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
