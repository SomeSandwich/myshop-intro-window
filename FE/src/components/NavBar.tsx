import React from "react";
import { NavLink } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { logout } from "./Auth/AuthSlice";
import { useAppDispatch } from "@/Hooks/apphooks";
export default function NavBar() {
    const dispatch = useAppDispatch();
    return (
        <header id="header">
            <div className="d-flex flex-column">
                <div className="side-bar">
                    <img
                        src="./assects/logo.jpg"
                        alt="Logo Book Store"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                                "https://react.semantic-ui.com/images/wireframe/square-image.png";
                        }}
                        className="img-fluid rounded-circle avatar"
                    />
                    <h1 className="store-name">
                        <a href="index.html">My Book Store</a>
                    </h1>
                </div>

                <nav id="navbar" className="nav-menu navbar">
                    <ul>
                        <li>
                            <NavLink to={"/"} className="nav-link scrollto">
                                <i className="fa-sharp fa-solid fa-chart-simple"></i>
                                <span>Dash Board</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/home"} className="nav-link scrollto">
                                <i className="fa-solid fa-house"></i>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/add-product"}
                                className="nav-link scrollto"
                            >
                                <i className="fa-solid fa-plus"></i>
                                <span>Add Book</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/categories/view"}
                                className="nav-link scrollto"
                            >
                                <i className="fa-sharp fa-solid fa-list-check"></i>
                                <span>Mange Category</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/order"}
                                className="nav-link scrollto"
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span>Order</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/help"} className="nav-link scrollto">
                                <i className="fa-solid fa-circle-question"></i>
                                <span>Help</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/about-us"}
                                className="nav-link scrollto"
                            >
                                <i className="fa-solid fa-circle-info"></i>
                                <span>About Us</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/login"}
                                className="nav-link scrollto"
                                onClick={(e) => {
                                    dispatch(logout);
                                }}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span>Log Out</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
