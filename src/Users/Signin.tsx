import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import "./index.css";

export default function Signin() {
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "USER"
    });
    const navigate = useNavigate();
    const signin = async () => {
    try {
        await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    } catch (error: any) {
        console.log(error.response.data);
    }
    };
    return (
        <div className="p-4 dashboard-height-margin">
            <h1 className="heading-style-sign-profile d-none d-md-block d-lg-block d-xl-block d-xxl-block">Sign In</h1>
            <br />
            <div className="col-sm-4">
                <label htmlFor="user" className="form-input-label-style">Username</label>
                <input id="user" className="form-control"
                    type="text"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={(e) =>
                        setCredentials({ ...credentials, username: e.target.value })} />
            </div>
            <br />
            <div className="col-sm-4">
                <label htmlFor="pass" className="form-input-label-style">Password</label>
                <input id="pass" className="form-control"
                    type="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })} />
            </div>
            <br />
            <div className="col-sm-4">
            <button type="button" className="btn signin-save-button-style"
                onClick={signin}> Sign In
            </button>
            </div>

            <div className="col-sm-4">
            <Link to="/Kanbas/Account/Signup"
                className="btn signin-save-button-style">
                Sign Up
            </Link>
            </div>
        </div>
    );
}
