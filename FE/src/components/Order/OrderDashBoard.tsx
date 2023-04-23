import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks'
import { IOrderDetailProduct } from '@/interfaces/Order'
import { Book } from '@/interfaces/bookDetail'
import { RootState } from '@/store'
import React, { useEffect, useState } from 'react'
import { addProductToCurrentOrder, removeProductToCurrentOrder } from './OrderSlice'
import { useNavigate } from 'react-router-dom'
import { Genre } from '@/interfaces/Genre'

export default function OrderDashBoard() {
  const listBook = useAppSelector((state: RootState) => state.book.listAllBook)
  const listProduct= useAppSelector((state: RootState) => state.order.currentOrder)
  const [books, setBooks] = useState<IOrderDetailProduct[]>(listProduct)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  console.log("boook")
  console.log(books)

  console.log(getDetailBook(books, listBook))
 
  const handleClick1 = () => {
    console.log("push")
    dispatch(addProductToCurrentOrder( {
      productId: 7,
      quantity: 10
    }))
  }
  const handleClick2 = () => {
    console.log("push")
    dispatch(addProductToCurrentOrder( {
      productId: 15,
      quantity: 10
    }))
  }
  const HandleDelete = (id:Number)=>{
    if(id)
    {
      dispatch(removeProductToCurrentOrder({id}))
    }
  }
  useEffect(() => {
    console.log("change")
    console.log(listProduct)
    const temp = getDetailBook(listProduct, listBook)
    setBooks(temp);
  }, [listProduct])
  
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={()=>{
        navigate("/order/add")
      }}>Primary</button>
      <ul>
        Order Dashboard
        {books.map((book) => {
          return <li onClick={e=>HandleDelete(book.productId)}>{book.title} - {book.quantity}</li>
        })}

      </ul>
      <button onClick={
        handleClick1
      }>ADD 1</button>
      <button onClick={
        handleClick2
      }>ADD 2</button>
    </div>

  )
}
export const getDetailBook = (books: IOrderDetailProduct[], listbook: Book[]) => {
  const bookClone:IOrderDetailProduct[] = []
  books.forEach((book, index, theArray) => {
    const indexinListAll = listbook.findIndex(e => e.id == book.productId)
    var subbook = JSON.parse(JSON.stringify(book))
    if (indexinListAll >= 0) {
      const newTitle = listbook[indexinListAll].title
      const price = listbook[indexinListAll].price
      const discount = listbook[indexinListAll].discount
  
      subbook.title = JSON.parse(JSON.stringify(newTitle))
      subbook.uniPrice = JSON.parse(JSON.stringify(price))
      subbook.uniPrice = JSON.parse(JSON.stringify(price)) * ( 100 - JSON.parse(JSON.stringify(discount)))/100
      subbook.discount = JSON.parse(JSON.stringify(discount))
      // theArray[index] = {...book,title:listbook[indexinListAll].title}
    }
    bookClone.push(subbook)
  })
  return bookClone
}