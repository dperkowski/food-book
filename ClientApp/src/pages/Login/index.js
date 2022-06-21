import React, { useEffect, useState } from "react";

import { useGetUserQuery, useGetRecipeQuery } from "../../redux/api";

const CookingBook = () => {
  const defaultDataStructure = {
    id: null,
    email: "",
    password: "",
  };

  // const { data, error, isLoading } = useGetUserQuery();
  const { data, error, isLoading } = useGetRecipeQuery();

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
      <div className="input-group mb-3">
        <span class="input-group-text">Email</span>
        <input
          type="text"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Email"
          value={loginValue.email}
          onChange={(e) => handleLoginInputChange(e, "email")}
        ></input>
      </div>

      <div className="input-group">
        <span class="input-group-text">Password</span>
        <input
          type="password"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Password"
          value={loginValue.password}
          onChange={(e) => handleLoginInputChange(e, "password")}
        ></input>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );

  return (
    <div className="container mt-auto">
      <div className="row">
        <h1 className="display-1 mb-4 text-center">Login</h1>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">{loginForm}</div>
      </div>

      <div className="row">
        <p>User: {loggedUser.email}</p>
        <p>Password: {loggedUser.password}</p>
        <p>Id: {loggedUser.id}</p>
      </div>
    </div>
  );
};

export default CookingBook;
