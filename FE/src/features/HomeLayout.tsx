import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import '../index.scss'
import NavBar from '@/components/NavBar'
export default function HomeLayout() {
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
