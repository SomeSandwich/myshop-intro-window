import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/login.scss";

export default function Login() {
    const userref = React.useRef<HTMLInputElement>(null);
    const passref = React.useRef<HTMLInputElement>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            username: userref.current?.value,
            password: passref.current?.value,
        };
        if (!userref.current?.value || !passref.current?.value) {
            alert("Please enter both a username and a password");
        } else if (
            containsSpecialChars(userref.current?.value) ||
            containsSpecialChars(passref.current?.value)
        ) {
            alert(
                "Username and Password not allowed to contain special characters"
            );
        }

        // Perform login process here, e.g. by making an API call or validating user credentials
        // For now, just redirect to the home page
        // const navigate = useNavigate();
        // navigate("/home");
    };

    const containsSpecialChars = (input: string): boolean => {
        const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return regex.test(input);
    };

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
                        <form onSubmit={handleLogin}>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="fas fa-user" />
                                    </span>
                                </div>
                                <input
                                    ref={userref}
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
                                    ref={passref}
                                    type="password"
                                    className="form-control input_pass"
                                    placeholder="password"
                                />
                            </div>

                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button
                                    type="submit"
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
                                <span>Signup</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
