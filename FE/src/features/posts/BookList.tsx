import CardBook from "@/components/Book/CardBook";
import { Book } from "@/interfaces/bookDetail";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookList(props: {
    booklist: Book[];
    handleDeleteBook: Function;
}) {
    const booklist = props.booklist;
    const navigate = useNavigate();
    return (
        <div className="row d-flex flex-wrap justify-content-between">
            {booklist ? (
                booklist.map((book) => (
                    <CardBook
                        id={book.id.toString()}
                        title={book.title}
                        price={book.price.toString()}
                        mediaPath={book.mediaPath[0]}
                    />
                ))
            ) : (
                <></>
            )}
        </div>
    );
}
