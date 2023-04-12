import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/login.scss";

export default function Login() {
    return (
        <div className="h-100 mt-5 align-items-center ">
            <div className="d-flex  justify-content-center h-100">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img
                                src="assects/logo.jpg"
                                className="brand_logo"
                                alt="Logo"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="fas fa-user" />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control input_user"
                                    placeholder="username"
                                />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="fas fa-key" />
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control input_pass"
                                    placeholder="password"
                                />
                            </div>

                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button
                                    type="button"
                                    name="button"
                                    className="btn login_btn"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4">
                        <div className="d-flex justify-content-center links">
                            Don't have an account?{" "}
                            <NavLink to={"/signup"}>
                                <span> Signup</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
