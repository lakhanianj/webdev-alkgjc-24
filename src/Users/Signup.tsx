import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="p-4 dashboard-height-margin">
      <h1 className="heading-style-sign-profile d-none d-md-block d-lg-block d-xl-block d-xxl-block">Signup</h1>
      {error && <div>{error}</div>}
      <div className="col-sm-4">
      <label htmlFor="user" className="form-input-label-style">Username</label>
      <input id="user" className="form-control" type="text" value={user.username} placeholder="Username" onChange={(e) => setUser({
          ...user, username: e.target.value })} />
    </div>
<br/>
    <div className="col-sm-4">
    <label htmlFor="pass" className="form-input-label-style">Password</label>
      <input id="pass" className="form-control" type="password" value={user.password} placeholder="Password" onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      </div>
      <br/>
      <div className="col-sm-4">
        <button type="button" className="btn signin-save-button-style"
            onClick={signup}> Signup
        </button>
        </div>
    </div>
  );
}

