import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import '../index.scss'
import NavBar from '@/components/NavBar'
export default function HomeLayout() {
  const location = useLocation()
  console.log(location)
  return (

    <div>
      <div className="container-fluid mt-4">
        <div className="row">
            <div className="navigation">
                <NavBar/>
            </div>
            <div className="main-container">
                <Outlet/>
            </div>
        </div>
        
      </div>
    </div>
  )
}
