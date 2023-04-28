import React from 'react'
import "./dashboard.scss"
import { NumericFormat } from 'react-number-format';
export default function TotalMoney(
    props: {
        title: string,
        amount: string,
        iconClass: string,
        bg_color: { left: string, right: string }
    }) {
    const bgStyle = {
        background: `linear-gradient(to right, ${props.bg_color.left} , ${props.bg_color.right})`
    };


    return (
        <div className='card-detail-dashboard row' style={bgStyle}>
            <div className='col-9'>
                <h6><strong>{props.title}</strong></h6>
                <span title={props.amount}>
                    <NumericFormat
                        displayType="text"
                        value={props.amount}
                        thousandSeparator={true}
                        suffix="đ"
                    />
                </span>
            </div>
            <div className='col'>
                <i className={props.iconClass}></i>
            </div>
        </div>
    )
}
