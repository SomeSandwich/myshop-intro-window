import { Category } from '@/interfaces/category'
import { RootState } from '@/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function ManageCate() {
  const cateList = useSelector((state:RootState)=>state.cate) 
    console.log(cateList)
    const dispatch = useDispatch()
  return (
    <div>
        <table className="table">
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
            return <CateCard category={cate} key={cate.Id.toString()}/>;
            })
          }
          </tbody>
        </table>
    </div>
  )
}
const CateCard = (props: {category : Category}) => {
  return (
    <tr>
      <td>{props.category.Id.toString()}</td>
      <td>{props.category.Description}</td>
      <td>
        <Link to={"/categories/edit/"+props.category.Id}>edit</Link> | <a href="/#">delete</a>
      </td>
    </tr>
  )
}