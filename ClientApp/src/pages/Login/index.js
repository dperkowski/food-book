import React, { useEffect, useState } from "react";

import { useGetUserQuery } from "../../redux/api";

const CookingBook = () => {
  const defaultDataStructure = {
    id: null,
    email: "",
    password: "",
  };

  const { data, error, isLoading } = useGetUserQuery(1);

  console.log(data);

  const [userList, setUserList] = useState([
    {
      id: 0,
      email: "@",
      password: "123",
    },
    {
      id: 1,
      email: "@1",
      password: "123",
    },
  ]);

  const [loginValue, setLoginValue] = useState({ ...defaultDataStructure });
  const [loggedUser, setLoggedUser] = useState({ ...defaultDataStructure });

  const handleLoginInputChange = (e, type) => {
    const newLoginValue = { ...loginValue };
    if (type === "email") {
      newLoginValue.email = e.target.value;
    } else if (type === "password") {
      newLoginValue.password = e.target.value;
    }
    setLoginValue(newLoginValue);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    userList.map((user) => {
      if (
        user.email === loginValue.email &&
        user.password === loginValue.password
      ) {
        setLoggedUser(user);
      }
    });
  };

  const loginForm = (
    <form onSubmit={handleLoginSubmit}>
      <div className="form-group">
        <label>Login</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Email"
          value={loginValue.email}
          onChange={(e) => handleLoginInputChange(e, "email")}
        ></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Password"
          value={loginValue.password}
          onChange={(e) => handleLoginInputChange(e, "password")}
        ></input>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );

  return (
    <div>
      <h1>Login</h1>
      <h2>User: {loggedUser.email}</h2>
      <h2>Password: {loggedUser.password}</h2>
      <h2>Id: {loggedUser.id}</h2>
      {loginForm}
    </div>
  );
};

export default CookingBook;
