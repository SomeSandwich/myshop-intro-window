import React from 'react'
import { NavLink } from 'react-router-dom';
import {Image,Segment, Grid } from 'semantic-ui-react';
export default function Help() {
    const post = {
        imageURL: [
            "",""
        ]
    }
  return (
    <div><div className = "card">
    <div className = "product-imgs">
      
      <div className = "img-display">
        <div className = "img-showcase">
          <Image src ={"https://react.semantic-ui.com/images/wireframe/square-image.png"} onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src ='https://react.semantic-ui.com/images/wireframe/square-image.png'
              }} alt = "No Image"/> 
        </div>
      </div>
      
      <div className = "img-select">
        {post.imageURL.map((image,index)=>{
          return<div className = "img-item">
          <a href = "#" data-id = {index}>
            <img src ={image?image: "https://react.semantic-ui.com/images/wireframe/square-image.png"} onError={({currentTarget}) => {
            currentTarget.onerror = null;
            currentTarget.src ='https://react.semantic-ui.com/images/wireframe/square-image.png'
          }} alt = "shoe image"/>
          </a>
        </div>
        })}
      </div>
    </div>
    <div className = "product-content">
      <br/>
      <h2 className = "product-title">Day IT</h2>
      <div className = "product-rating">
        <span id ="yellowText">5 </span>
        <i className = "fas fa-star"></i>
        <i className = "fas fa-star"></i>
        <i className = "fas fa-star"></i>
        <i className = "fas fa-star"></i>
        <i className = "fas fa-star"></i>
        
        <span id ="redText">1222</span>
        <span> lượt đăng ký còn lại </span>
      </div>

      <div className = "product-detail">
        <Segment>
        <h4 id ="centerText"> Mô tả sản phẩm</h4> 
            <p>asdasdsa</p>
        </Segment>
      </div>
      <br/>
      <i className="big tag icon"></i>
      <span id ="priceNum"> 10000000 VNĐ</span>
      
      <Segment>
        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' verticalAlign='top' size='tiny' circular></Image>
        <span >Đăng bài này lúc: 12h </span>
        <br/>
        <span >Thong</span>
      </Segment>
      <div className = "purchase-info">
        <button type = "button" className = "btn">
          <NavLink to={`/posts/order/1`} >Order <i className = "fas fa-shopping-cart"></i></NavLink>
        </button>
        <button type = "button" className = "btn">
          <NavLink to={`/posts/approach/1}`} >Approach<i className = "address book outline icon"></i></NavLink>
        </button>
      </div>
    </div>
  </div></div>
  )
}
