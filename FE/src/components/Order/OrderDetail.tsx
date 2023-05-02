import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks'
import { arraysEqual } from '@/features/Categories/CateSlice'
import { IOrderDetailProduct } from '@/interfaces/Order'
import { OutputOrderDetail } from '@/interfaces/Order'
import { Book } from '@/interfaces/bookDetail'
import { RootState } from '@/store'
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import Select, { components } from 'react-select'
import { calculator } from './AddOrder'
import { DeleteOrderService, getOrderByIDService } from '@/services/order.service'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateOrderThunk } from './OrderSlice'
import { Notification, notification } from '../Book/AddBook'
import { ToastContainer } from 'react-toastify'
const options = [
  {
    label: "Processing",
    value: "Processing",

  },
  {
    label: "Done",
    value: "Done",
  },
  {
    label: "Deleted",
    value: "Deleted",
  },
]
const { Option } = components;
const IconOption = (props: any) => {
  var icon = <i style={{ color: "darkgoldenrod" }} className="fa-solid fa-bolt mr-2"></i>
  if (props.data.label == Status.Done) {
    icon = <i style={{ color: "lightgreen" }} className="fa-regular fa-circle-check mr-2"></i>
  } else if (props.data.label == Status.Deleted) {
    icon = <i style={{ color: "red" }} className="fa-regular fa-trash-can mr-2"></i>
  }
  return (
    <Option {...props} className='d-flex align-items-center'>
      {icon}
      <span className='text-dark'>{props.data.label}</span>

    </Option>
  )
};
export default function OrderDetail() {
  const {id} = useParams()
  if(!id) return <></>
  const booklist = useAppSelector((state: RootState) => state.book.listAllBook)
  const [order, setOrder] = useState<OutputOrderDetail>()
  const [listDetail, setListDetail] = useState<IOrderDetailProduct[]>()
  const [total, setTotal] = useState<Number>(order ? order.total : 0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const callApi=async()=>{
      const data = await getOrderByIDService(+id)
      setOrder(data)
    }
    callApi()
  }, [])
  useEffect(() => {
    const updateListProduct =async () => {
      if (order && booklist.length>0) {
        const newOrderProduct = await getMoreDetailOfProduct(booklist, order.orderDetails)
        if (!arraysEqual(newOrderProduct, listDetail)) {
          setListDetail(newOrderProduct)
        }
      }
    }
    updateListProduct()
  }, [order,booklist])
  
  
  useEffect(() => {
    if (listDetail && order) {
      const newtotal = calculator(listDetail)
      setTotal(newtotal)
    }
  }, [listDetail])
  const handleDelete = (productId: Number) => {
    if (order) {
      const newOrderDetails = order.orderDetails.filter(detail => detail.productId != productId)
      setOrder({ ...order, orderDetails: newOrderDetails })
    }
  }
  const handleSave = () => {
    if (order) {
      const curorder = { ...order, total: total }
      dispatch(UpdateOrderThunk({id:id,newOrder:curorder}))
    }
  }
  const handleDeleteOrder =async ()=>{
    if(order){
      await DeleteOrderService(order.id.toString()).then(()=>{
        notification("Delete Success",Notification.Success)
        navigate("/order")
      }).catch(()=>{
        notification("Delete Fail",Notification.Error)
      })
    }
    
  }

  const handleChange = (selectedOption: any) => {
    if (selectedOption && order) {

      setOrder({ ...order, status: selectedOption.value });
      // setOrder({...order,status:selectedOption.value});
    }
  };
  if (!order) return <></>
  return (
    <div className='order-detail-full m-4 p-2'>
      <ToastContainer />
      <div className='d-flex justify-content-start'>
        <h1><strong>Order </strong><span className='ml-1 text-secondary'>#{+order.id}</span></h1>
      </div>

      <div className='customer-infor row bg-light p-4'>
        <div className='col'>
          <div className='row'>
            <div className='col align-items-center d-flex justify-content-between'>
              <h4>
                <strong>Customer</strong>
              </h4>
              <span>{"Place on: " + order.createAt}</span>
            </div>
          </div>
          <div className='row '>
            {order.customer?
            <div className='col d-flex'>
              <div className='pt-2 mt-2'>
                <i className="fa-solid fa-user"></i>
                <strong className='ml-1 mr-1'>Name:</strong>
                {order.customer.name}
              </div>
              <div className='pt-2 mt-2 ml-3'>
                <i className="fa-sharp fa-solid fa-mobile-screen"></i>
                <strong className='ml-1 mr-1'>Phone:</strong>
                {order.customer.phoneNumber}
              </div>
            </div>
            :<></>}
          </div>
        </div>
      </div>
      <div className='row status-box mt-1 bg-light p-4'>
        <div className='col'>
          <div className='row'>
            <div className='col align-items-center d-flex justify-content-between'>
              <h4>
                <strong>Status</strong>
              </h4>
              <div style={{ backgroundColor: "transparent" }}>
                <Select className="form-control bg-light" onChange={handleChange} options={options} components={{ Option: IconOption }} />
              </div>
              <span><StatusCard status={order.status} /></span>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-1 bg-light'>
        <table className="table table-striped">
          <thead className='bg-white'>
            <tr>
              <th scope="col" style={{ minWidth: widthTableMargin, maxWidth: widthTableMargin, width: widthTableMargin }}></th>
              <th scope="col" className='text-left'>Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {listDetail ? listDetail.map((detail) => {
              return <tr>
                <th scope="col" style={{ minWidth: widthTableMargin, maxWidth: widthTableMargin, width: widthTableMargin }}></th>
                <th scope="row" className='text-left' >{detail.title}</th>
                <td>{detail.unitPrice ? +detail.unitPrice : 0}</td>
                <td>{+detail.quantity}</td>
                <td>{detail.unitPrice ? +detail.unitPrice * +detail.quantity : 0}</td>
                <td colSpan={1} style={{ width: "30px" }}>
                {/* <span onClick={() => {
                    handleDelete(detail.productId)
                }}>
                    <button className='add-product-btn' >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </span> */}
            </td>
              </tr>
            }) : <></>}
          </tbody>
        </table>

      </div>
      <div className='row'>
        <div className='d-flex justify-content-end col p-3 mr-3'>
          <strong className='mr-4'>TOTAL:</strong>
          <NumericFormat
            displayType="text"
            value={+total}
            thousandSeparator={true}
            suffix="đ"
          />
        </div>
      </div>
      <div className='row d-flex justify-content-end'>
        {order.status == Status.Deleted ?
          <button onClick={handleDeleteOrder} className='btn btn-danger text-white'> ConFirm Delete</button>:
          <button onClick={handleSave} className='btn btn-success text-white'> Save Change</button>
        }
      </div>
    </div>
  )
}
export const StatusCard = (props: { status: String }) => {
  switch (props.status) {
    case Status.Processing: {
      return <div style={{ width: "120", backgroundColor: "yellow" }} className='p-2'>
        <i style={{ color: "dark" }} className="fa-solid fa-bolt mr-2"></i>
        {Status.Processing}
      </div>
    }
    case Status.Done: {
      return <div style={{ width: "120", backgroundColor: "lightgreen" }} className='p-2'>
        <i style={{ color: "dark" }} className="fa-regular fa-circle-check mr-2"></i>
        {Status.Done}
      </div>
    }
    case Status.Deleted: {
      return <div style={{ width: "120", backgroundColor: "red" }} className='p-2'>
        <i style={{ color: "dark" }} className="fa-regular fa-trash-can mr-2"></i>
        <strong>{Status.Deleted}</strong>
      </div>
    }
  }
  return <></>

}
export enum Status {
  Processing = "Processing",
  Done = "Done",
  Deleted = "Deleted"
}
const widthTableMargin = "15px"
const getMoreDetailOfProduct = (bookList: Book[], currDetail: {
  productId: Number;
  cost: Number;
  unitPrice: Number;
  discount: Number;
  quantity: Number;
}[]) => {
  const bookClone: IOrderDetailProduct[] = [];
  currDetail.forEach((book, index, theArray) => {
    const indexinListAll = bookList.findIndex(
      (e) => e.id == book.productId
    );
    var subbook :IOrderDetailProduct = JSON.parse(JSON.stringify(book));

    if (indexinListAll >= 0) {
      const newTitle = bookList[indexinListAll].title;
      subbook = {...subbook,title:JSON.parse(JSON.stringify(newTitle))};
    }
    bookClone.push(subbook);
  });
  return bookClone;
}
