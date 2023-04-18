import { Category } from '@/interfaces/category'
import { RootState } from '@/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
export default function ManageCate() {

  const cateList = useSelector((state: RootState) => state.cate.listCate)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div>
      <h2>List of Category</h2>
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
              return <CateCard category={cate} key={cate.id.toString()} />;
            })
          }
        </tbody>
      </table>
    </div>
  )
}
const CateCard = (props: { category: Category }) => {
  return (
    <tr>
      <td>{props.category.id.toString()}</td>
      <td>{props.category.description}</td>
      <td>
        <Link to={"/categories/edit/" + props.category.id}>edit</Link> | <a href="/#">delete</a>
      </td>
    </tr>
  )
}