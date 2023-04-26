import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks';
import { filterlistBookOutOfStock } from '@/features/posts/BookSlice';
import { Book } from '@/interfaces/bookDetail';
import { RootState } from '@/store';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProductStatistics() {
    const listAllBook = useAppSelector((state: RootState) => state.book.listAllBook)
    const listBookOutOfStock = useAppSelector((state: RootState) => state.book.listBookOutOfStock)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(filterlistBookOutOfStock(""))
    },[listAllBook])
    return (
        <div>
            <h5><strong>Sản phẩm sắp hết hàng</strong></h5>
            <table className="table mt-4">
                <thead className="thead-light">
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Author</th>
                        <th>CoverType</th>
                        <th>Price</th>
                        <th>NumPages</th>
                        <th>Category</th>
                        <th>UpdateAt</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listBookOutOfStock.map(book => {
                            return <BookCard  book={book} key={book.id.toString()} />;
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
const BookCard = (props: { book: Book }) => {
    const navigate = useNavigate()
    return (
      <tr onClick={()=>{
        navigate(`/books/viewDetail/${props.book.id}`)
      }}>
        <td>{props.book.id.toString()}</td>
        <td>{props.book.title}</td>
        <td>
            {+props.book.quantity}
        </td>
        <td>{props.book.author}</td>
        <td>{props.book.coverType}</td>
        <td>{+props.book.price}</td>
        <td>{+props.book.numPages}</td>
        <td>{props.book.categoryDescription}</td>
        <td>{props.book.updateAt}</td>
      </tr>
    )
  }