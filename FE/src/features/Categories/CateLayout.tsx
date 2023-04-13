import React from 'react'
import { Outlet } from 'react-router-dom'

export default function CateLayout() {
  return (
    <div className='col d-flex flex-column justify-content-center'>
        <h2>List of Category</h2>
        <Outlet/>
    </div>
  )
}
