import React from "react";
import "./styles/CardBook.scss";
import { NumericFormat } from "react-number-format";
import { Navigate, useNavigate } from "react-router-dom";
export default function CardBook(props: {
    title: string;
    price: string;
    imgUrl: string;
    id: string;
}) {
    const navigate = useNavigate();
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/books/viewDetail/" + props.id);
    };
    return (
        // <div className="container">
        <article
            id={props.id.toString()+"cardbook"}
            onClick={handleOnClick}
            className="card-book card depth--two"
            style={{ maxHeight: "400px", maxWidth: "300px" }}
        >
            <figure className="image">
                <img
                    style={{ maxHeight: "200px", maxWidth: "300px" }}
                    // src={props.imgUrl}
                    src={
                        props.imgUrl
                            ? props.imgUrl
                            : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    }
                    alt={props.title}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                            "https://react.semantic-ui.com/images/wireframe/square-image.png";
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
