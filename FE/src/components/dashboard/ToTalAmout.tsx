import React from 'react'
import "./dashboard.scss"
export default function ToTalAmout(
    props:{
        title: string,
        amount:string,
        iconClass:string,
        bg_color:{left:string,right:string}
        }) 
    {
    const bgStyle = {
        background: `linear-gradient(to right, ${props.bg_color.left} , ${props.bg_color.right})`
    };

    
    return (
    <div className='card-amount row' style={bgStyle}>
        <div className='col-9'>
            <h6><strong>{props.title}</strong></h6>
            <span title={props.amount}>{props.amount}</span>
        </div>
        <div className='col'>
            <i className={props.iconClass}></i>
        </div>
    </div>
  )
}
