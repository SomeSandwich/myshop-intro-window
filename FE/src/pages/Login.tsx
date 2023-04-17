import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/login.scss";
import { useDispatch } from "react-redux";
import { login } from "@/components/Auth/AuthSlice";
import { ILoginInput } from "@/interfaces/IAuth";
import { useAppDispatch } from "@/Hooks/apphooks";

export default function Login() {
    const userref = React.useRef<HTMLInputElement>(null);
    const passref = React.useRef<HTMLInputElement>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        if (
            !userref.current?.value ||
            !passref.current?.value 
        ) {
            alert("Please fill all the fields");
        }
        //email validation
        else if (
            containsSpecialChars(userref.current?.value) ||
            containsSpecialChars(passref.current?.value)
        ) {
            alert(
                "Username and Password not allowed to contain special characters"
            );
        } else {
            const user : ILoginInput= {
                username: userref.current?.value,
                password: passref.current?.value,
            }
            dispatch(login(user))
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
    const dispatch = useAppDispatch()   
    // const handleLogin = async (e: SubmitEvent)=>
    // {
    //     e.preventDefault()
    //     const user : ILoginInput= {
    //         username: "123",
    //         password: "123"
    //     }
    //     dispatch(login(user))
    // }
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
                                    type="text"
                                    className="form-control input_user"
                                    placeholder="username"
                                    ref={userref}
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
                                    ref={passref}
                                />
                            </div>

                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button
                                    type="submit"
                                    name="button"
                                    className="btn login_btn"
                                >
                                    LogIn
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
