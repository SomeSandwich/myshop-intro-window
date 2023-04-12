import { Book } from '@/interfaces/bookDetail'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BookList(props:{booklist: Book[]}) {
    const booklist = props.booklist
    const navigate = useNavigate()
    return (
        <div className='row d-flex flex-wrap justify-content-between'>
        {booklist?booklist.map((book) => (
            
            <div className='product mb-4 mt-4 ml-5' onClick={()=>{
              navigate('/books/'+book.Id)
            }}>
               {book.Title}
            </div>
          )):<div></div>}
    </div>
  )
}
