import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import '../index.scss'
import NavBar from '@/components/NavBar'
import useLocalStore from '@/Hooks/useLocalStore'
import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks'
import { getAllCategoryThunk } from './Categories/CateSlice'
import { RefreshPrice, filterBookbyCate, getAllBookThunk } from './posts/BookSlice'
import { RootState } from '@/store'
import { getAllCustomerThunk } from '@/components/Customer/CustomerSlice'
export default function HomeLayout() {
  const location = useLocation()
  const [lastDomand, setLastDomand] = useLocalStore({ key: "lastDomand", initialValue: "/" })
  const bookList = useAppSelector((state: RootState) => state.book.listAllBook);
  const cateList = useAppSelector((state: RootState) => state.cate.listCate);
  
  console.log(location)
  useEffect(() => {
    setLastDomand(location.pathname)
  }, [location])
  const dispatch = useAppDispatch()
  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllCategoryThunk())
      await dispatch(getAllBookThunk())
      await dispatch(getAllCustomerThunk())
    }
    getData();
  }, [])
  useEffect(() => {
    const getData = async () => {
      if (cateList) {
        await dispatch(RefreshPrice(""))
        await dispatch(filterBookbyCate(cateList))
      }
    }
    getData();
  }, [bookList])
  return (

    <div>
      <div className="container-fluid">
        <div className="row d-flex flex-column justify-content-center pr-4">
          <div className="navigation">
            <NavBar />
          </div>
          <div className="main-container mt-4">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  )
}
