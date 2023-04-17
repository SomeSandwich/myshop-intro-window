import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import '../index.scss'
import NavBar from '@/components/NavBar'
export default function HomeLayout() {
  const location = useLocation()
  console.log(location)
  return (

    <div>
      <div className="container-fluid">
        <div className="row d-flex flex-column justify-content-center pr-4">
            <div className="navigation">
                <NavBar/>
            </div>
            <div className="main-container mt-4">
                <Outlet/>
            </div>
        </div>
        
      </div>
    </div>
  )
}
