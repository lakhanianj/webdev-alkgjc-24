import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import "./index.css";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const [user, setUser] = useState<User>({
    _id: "", 
    username: "", password: "", firstName: "",
    lastName: "", role: "USER" });
  
    const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="p-4 dashboard-height-margin">
      <h1 className="heading-style-sign-profile d-none d-md-block d-lg-block d-xl-block d-xxl-block">User Table</h1>
      <table className="table d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block">
        <thead>
          <tr>
            <th><div className="form-input-label-style">Username</div></th>
            <th><div className="form-input-label-style">Password</div></th>
            <th><div className="form-input-label-style">First Name</div></th>
            <th><div className="form-input-label-style">Last Name</div></th>
            <th><div className="form-input-label-style">Role</div></th>
            <th>&nbsp;</th>
          </tr>
          <tr>
            <td>
              <input value={user.username} onChange={(e) =>
                setUser({ ...user, username: e.target.value })}/>
            </td>
            <td>
            <input value={user.password} onChange={(e) =>
                setUser({ ...user, password: e.target.value })}/>
            </td>
            <td>
              <input value={user.firstName} onChange={(e) =>
                setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <input value={user.lastName} onChange={(e) =>
                setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
              <select value={user.role} onChange={(e) =>
                setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
            <button type="button" className="icon-button-add-user" onClick={createUser}>{<FaPlusCircle className="fs-4"/>}</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td></td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td><button type="button" className="icon-button-delete-user" onClick={() => deleteUser(user)}>{<FaTrash className="fs-4"/>}</button></td>
            </tr>))}
        </tbody>
      </table>
      <div className="col-sm-2">
            <Link to="/Kanbas/Account/Profile"
                className="btn signin-save-button-style">
                Back
            </Link>
            </div>
    </div>
  );
} 
