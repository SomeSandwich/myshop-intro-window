import React from "react";
import "./styles/pages.scss";

export default function Signup() {
    return (
        <div>
            <main>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <a
                                            href="assets/book.img"
                                            className="logo d-flex align-items-center w-auto"
                                        >
                                            <img src="assets/img/logo.png" />
                                            <span className="d-none d-lg-block">
                                                My Book Store
                                            </span>
                                        </a>
                                    </div>
                                    {/* End Logo */}
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">
                                                    Create an Account
                                                </h5>
                                                <p className="text-center small">
                                                    Enter your personal details
                                                    to create account
                                                </p>
                                            </div>
                                            <form
                                                className="row g-3 needs-validation"
                                                noValidate
                                            >
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="yourEmail"
                                                        className="form-label"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        id="yourEmail"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please enter a valid
                                                        Email adddress!
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="yourUsername"
                                                        className="form-label"
                                                    >
                                                        Username
                                                    </label>
                                                    <div className="input-group has-validation">
                                                        <span
                                                            className="input-group-text"
                                                            id="inputGroupPrepend"
                                                        >
                                                            @
                                                        </span>
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            className="form-control"
                                                            id="yourUsername"
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            Please choose a
                                                            username.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label
                                                        htmlFor="yourPassword"
                                                        className="form-label"
                                                    >
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        id="yourPassword"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please enter your
                                                        password!
                                                    </div>
                                                </div>
                                                <br />

                                                <div className="col-12 margin-signup">
                                                    <button
                                                        className="btn btn-primary w-100"
                                                        type="submit"
                                                    >
                                                        Create Account
                                                    </button>
                                                </div>
                                                <div className="col-12 margin-signup">
                                                    <p className="small mb-0">
                                                        Already have an account?{" "}
                                                        <a href="pages-login.html">
                                                            Log in
                                                        </a>
                                                    </p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            {/* End #main */};
        </div>
    );
}
