import React from 'react'
import './styles/Aboutus.css'
export default function AboutUs() {
    return (
        <div
            className="about-us align-items-center d-flex justify-content-between p-5 flex-wrap"
            style={{ height: "100vh" }}
        >
            <div className="card-member ml-5 mr-5">
                <div className="card-frame card-face">

                </div>
                <div className="card-back card-face">
                    <img className="avatar" src="./assects/logo.jpg" alt="LacDa" />
                    <div>
                        <h3>Nguyễn Tấn Hiếu</h3>
                        <span>20127159</span>
                    </div>
                </div>
                <div className="card-front card-face">
                    <span>Leader</span>
                </div>
            </div>
            <div className="card-member ml-5 mr-5">
                <div className="card-frame card-face">

                </div>
                <div className="card-back card-face">
                    <img className="avatar" src="./assects/logo.jpg" alt="LacDa" />
                    <div>
                        <h3>Võ Thanh Sương</h3>
                        <span>20127312</span>
                    </div>
                </div>
                <div className="card-front card-face">
                    <span>Member</span>
                </div>
            </div>
            <div className="card-member ml-5 mr-5">
                <div className="card-frame card-face">

                </div>
                <div className="card-back card-face">
                    <img className="avatar" src="./assects/logo.jpg" alt="LacDa" />
                    <div>
                        <h3>Nguyễn Văn Hậu</h3>
                        <span>20127493</span>
                    </div>
                </div>
                <div className="card-front card-face">
                    <span>Member</span>
                </div>
            </div>
            <div className="card-member ml-5 mr-5">
                <div className="card-frame card-face">

                </div>
                <div className="card-back card-face">
                    <img className="avatar" src="./assects/logo.jpg" alt="LacDa" />
                    <div>
                        <h3>Võ Minh Thông</h3>
                        <span>20127638</span>
                    </div>
                </div>
                <div className="card-front card-face">
                    <span>Member</span>
                </div>
            </div>
            
        </div>
    )
}
