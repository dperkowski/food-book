import React, { useEffect, useState } from "react";

const CookingBook = () => {
  const defaultDataStructure = {
    id: 0,
    title: "",
    description: "",
    isFav: false,
    isVisible: true,
  };

  const [userList, setUserList] = useState([
    {
      id: 0,
      email: "test@test.pl",
      password: "",
    },
  ]);
  const [loggedUser, setLoggedUser] = useState();
  const [loginValue, setLoginValue] = useState({});

  const handleLoginInputChange = (e, type) => {
    const newLoginValue = { ...loginValue };
    if (type === "email") {
      newLoginValue.email = e.target.value;
      setLoginValue(newLoginValue);
    } else if (type === "password") {
      newLoginValue.password = e.target.value;
    }
    setLoginValue(newLoginValue);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  const loginForm = (
    <form onSubmit={handleLoginSubmit}>
      <div className="form-group">
        <label>Title</label>
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
        <label>Description</label>
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
      {loginForm}
    </div>
  );
};

export default CookingBook;
