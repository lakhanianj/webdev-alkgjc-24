import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function Profile() {
    const [profile, setProfile] = useState({
        _id: "", username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };

    const save = async () => {
        await client.updateUser(profile);
    };

    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
      };    

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="p-4 dashboard-height-margin">

            <h1 className="col-sm-4 heading-style-sign-profile d-none d-md-block d-lg-block d-xl-block d-xxl-block">Profile</h1>

            {profile && (
                <div className="col-sm-4">
                    <div className="mb-2">
                        <label htmlFor="user" className="form-input-label-style">Username</label>
                        <input id="user" className="form-control" value={profile.username} onChange={(e) =>
                            setProfile({ ...profile, username: e.target.value })} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="pass" className="form-input-label-style">Password</label>
                        <input id="pass" className="form-control" value={profile.password} onChange={(e) =>
                            setProfile({ ...profile, password: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="f_name" className="form-input-label-style">First Name</label>
                        <input id="f_name" className="form-control" value={profile.firstName} onChange={(e) =>
                            setProfile({ ...profile, firstName: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="l_name" className="form-input-label-style">Last Name</label>
                        <input id="l_name" className="form-control" value={profile.lastName} onChange={(e) =>
                            setProfile({ ...profile, lastName: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="dob" className="form-input-label-style">Date of Birth</label>
                        <input id="dob" className="form-control" value={profile.dob} type="date" onChange={(e) =>
                            setProfile({ ...profile, dob: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-input-label-style">Email</label>
                        <input id="email" className="form-control" value={profile.email} onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="role" className="form-input-label-style">Role</label>
                        <select id="role" className="form-control" onChange={(e) =>
                            setProfile({ ...profile, role: e.target.value })}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="col-sm-4">
                <button className="btn signin-save-button-style" onClick={save}>
                    Save
                </button>
            </div>
            
            <div className="col-sm-4">
                <button className="btn signin-save-button-style" onClick={signout}>
                    Signout
                </button>
            </div>

            <div className="col-sm-4">
            <Link to="/Kanbas/Account/Admin/Users"
                className="btn signin-save-button-style">
                Users
            </Link>
            </div>
        </div>
    );
}

