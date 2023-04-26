import React from "react";
import "./styles/CardBook.scss";
import { NumericFormat } from "react-number-format";
import { Navigate, useNavigate } from "react-router-dom";
const cardWidthImage = "300px";
const cardHeigthImage = "350px";
const cardWidth = "300px";
const cardHeigth = "450px";
export default function CardBook(props: {
    title: string;
    price: string;
    mediaPath: string;
    id: string;
}) {
    const navigate = useNavigate();
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/books/viewDetail/" + props.id);
    };
    return (
        // <div className="container">
        <article
            id={props.id.toString() + "cardbook"}
            onClick={handleOnClick}
            className="card-book card depth--two"
            style={{ maxHeight: cardHeigth, maxWidth: cardWidth }}
        >
            <figure className="image">
                <img
                    style={{
                        maxHeight: cardHeigthImage,
                        maxWidth: cardWidthImage,
                        minHeight: cardHeigthImage,
                        minWidth: cardWidthImage,
                    }}
                    // src={props.imgUrl}
                    src={
                        props.mediaPath
                            ? "https://s3.hieucckha.me/public/" +
                              props.mediaPath
                            : "https://www.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg"
                    }
                    alt={props.title}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                            "https://www.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg";
                    }}
                />
            </figure>
            <div className="card__body">
                <header className="card__primary-title">
                    <h2 className="text-large">{props.title}</h2>
                </header>
                <div className="card__supporting-text">
                    <NumericFormat
                        displayType="text"
                        value={props.price}
                        thousandSeparator={true}
                        suffix="đ"
                    />
                </div>
            </div>
        </article>
        // </div>
    );
}
