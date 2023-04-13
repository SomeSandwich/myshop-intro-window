import CateLineFilter from '@/features/Categories/CateLineFilter'
import BookList from '@/features/posts/BookList'
import { removeBook, updateBook } from '@/features/posts/BookSlice'
import { addBook } from '@/features/posts/BookSlice'
import { RootState } from '@/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
export default function Home() {
    const bookList = useSelector((state:RootState)=>state.book.allBook) 
    console.log(bookList)
    const dispatch = useDispatch()
    const handleAddBtnClick = ()=>{
        dispatch(addBook({
            Id:5,
            Price: 55000,
            Discount: 5300,
            Title: "Lap Trinh Unity",
            Description: "Lap Trinh Game Thieu Nhi",
            MediaPath: "meedia",
            CreateAt: new Date(),
            UpdateAt: new Date(),
            Quantity: 15,
            Status: 1,
            CategpryId: 1,
        }))
    }
    const handleUpdateBtnClick = ()=>{
        dispatch(updateBook({
            Id:4,
            Price: 55000,
            Discount: 5300,
            Title: "Sach Update",
            Description: "Lap Trinh Game Thieu Nhi",
            MediaPath: "meedia",
            CreateAt: new Date(),
            UpdateAt: new Date(),
            Quantity: 15,
            Status: 1,
            CategpryId: 1,
        }))
    }
    const handelDeleteBook = (bookId:Number)=>{
        dispatch(removeBook(bookId))
    }
  return (
    <div>
        <div className='row'>
            <form className="form-inline">
                <input className="form-control mr-lg-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        <div className='row'>
           <CateLineFilter/>
        </div>
        <div className='row'>
            <BookList booklist={bookList} handleDeleteBook={handelDeleteBook}/>
        </div>
        <div className='row'>
            <button onClick={()=>handleAddBtnClick()}>Add</button>
            <button onClick={()=>handleUpdateBtnClick()}>Update</button>
        </div>
    </div>
  )
}
