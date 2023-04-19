import { Category } from '@/interfaces/category'
import { RootState } from '@/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { DeleteCate, getAllCategory, removeCate } from './CateSlice'
import { useAppDispatch } from '@/Hooks/apphooks'
import { deleteCateService } from '@/services/categories.service'

export default function ManageCate() {

  const cateList = useSelector((state: RootState) => state.cate.listCate)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const HandleDeleteClick= async (cateid:string)=>{
    await dispatch(DeleteCate(cateid))
  }
  return (
    <div>
      <div className='row d-fles justify-content-between' >        
        <h2 className=''  ></h2>
        <h2 className='' style={{ marginRight: 50 }} >List of Category</h2>
        <button className='btn btn-success' onClick={() => { navigate('/categories/add') }} > Add</button>
      </div>
      <table className="table mt-4">
        <thead className="thead-light">
          <tr>
            <th>Categories ID</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            cateList.map(cate => {
              return <CateCard handleDelete={HandleDeleteClick} category={cate} key={cate.id.toString()} />;
            })
          }
        </tbody>
      </table>
    </div>
  )
}
const CateCard = (props: { category: Category ,handleDelete :Function }) => {
  
  
  return (
    <tr>
      <td>{props.category.id.toString()}</td>
      <td>{props.category.description}</td>
      <td>
        <Link to={"/categories/edit/" + props.category.id}>edit</Link> | <span onClick={()=>{
          
          props.handleDelete(props.category.id.toString())
        }}><i className="fa-solid fa-trash"></i></span>
      </td>
    </tr>
  )
}