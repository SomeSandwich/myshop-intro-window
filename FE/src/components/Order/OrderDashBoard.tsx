import { useAppSelector } from '@/Hooks/apphooks'
import { IOrderDetailProduct } from '@/interfaces/Order'
import { Book } from '@/interfaces/bookDetail'
import { RootState } from '@/store'
import React, { useEffect, useState } from 'react'
const testProduct: IOrderDetailProduct[] = [{
  productId: 7,
  quantity: 10
}, {
  productId: 15,
  quantity: 30
}, {
  productId: 12,
  quantity: 50
}]
export default function OrderDashBoard() {
  const listBook = useAppSelector((state: RootState) => state.book.listAllBook)
  // const listProduct= useAppSelector((state: RootState) => state.order.currentOrder)
  const [bookstest, setbookstest] = useState<IOrderDetailProduct[]>([])
  const [books, setBooks] = useState<IOrderDetailProduct[]>(bookstest)
  console.log("boook")
  console.log(books)

  console.log(getDetailBook(books, listBook))
 
  const handleClick = () => {
    console.log("push")
    setbookstest(oldArray => [...oldArray, {
      productId: 7,
      quantity: 10
    }])
  }
  const HandleDelete = (title:string|undefined)=>{
    if(title)
      setbookstest(books.filter(item => item.title !== title))
  }
  useEffect(() => {
    console.log("change")
    const temp = getDetailBook(bookstest, listBook)
    setBooks(temp);
  }, [bookstest])
  return (
    <div>
      <ul>
        Order Dashboard
        {books.map((book) => {
          return <li onClick={e=>HandleDelete(book.title)}>{book.title} - {book.quantity}</li>
        })}

      </ul>
      <button onClick={
        handleClick
      }>ADD</button>
    </div>

  )
}
const getDetailBook = (books: IOrderDetailProduct[], listbook: Book[]) => {
  books.forEach(book => {
    const index = listbook.findIndex(e => e.id == book.productId)
    if (index >= 0) {
      book.title = listbook[index].title
    }
  })
  return books
}