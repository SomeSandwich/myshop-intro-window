import React from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./styles/login.scss";
import { useDispatch } from "react-redux";
import { isLoading, isLogin, login } from "@/components/Auth/AuthSlice";
import { ILoginInput } from "@/interfaces/IAuth";
import { useAppDispatch, useAppSelector } from "@/Hooks/apphooks";
import axios from "axios";
import { env } from "process";
import useLocalStore from "@/Hooks/useLocalStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    // const userref = React.useRef<HTMLInputElement>(null);
    // const passref = React.useRef<HTMLInputElement>(null);
    const [username, setUsername] = useLocalStore({key:"name",initialValue: ""});
    const [password, setPassword] = useLocalStore({key:"pass",initialValue: ""});
    const [lastDomand, setLastDomand] =  useLocalStore({key:"lastDomand",initialValue: "/"})
    
    const navigate = useNavigate()
    const Loading = useAppSelector(isLoading);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        // if (
        //     !userref.current?.value ||
        //     !passref.current?.value 
        // ) {
        //     alert("Please fill all the fields");
        // }
        if (
            username=="" ||
            password==""
        ) {
            notification("Vui lòng nhập đầy đủ", Notificatrion.Warn);
        }
        //email validation
        else if (
            containsSpecialChars(username) ||
            containsSpecialChars(password)
        ) {
            notification("Username và password không được chứa ký tự đặc biệt", Notificatrion.Warn);
        } else {
            const user : ILoginInput= {
                username: username,
                password: password,
            }
            const logRes = await dispatch(login(user)).then((res)=>{
                if(res.type == "auth/login/fulfilled")
                {
                    if(lastDomand)
                        navigate(lastDomand)
                    else
                        navigate("/")
                }
            }).catch(e=>{
            
                alert(e)
            })

            
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
        <div className="align-items-center d-flex justify-content-center" style={{height:"100vh"}}>
            <ToastContainer />
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
                                    // ref={userref}
                                    value={username}
                                    onChange={(e)=>{setUsername(e.currentTarget.value)}}
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
                                    // ref={passref}
                                    value={password}
                                    onChange={(e)=>{setPassword(e.currentTarget.value)}}
                                />
                            </div>

                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button
                                    type="submit"
                                    name="button"
                                    className="btn login_btn"
                                >
                                    {Loading?<i className="fa fa-spinner fa-spin"></i>:"Login"}
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

export enum Notificatrion {
    Warn,
    Success,
    Error,
}
export const notification = (message: string, type: Notificatrion) => {
    if (type == Notificatrion.Warn) {
        toast.warn(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (type == Notificatrion.Success) {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (type == Notificatrion.Error) {
        toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
};
