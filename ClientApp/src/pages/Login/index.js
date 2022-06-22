import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login, reset } from "../../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) {
      toast.success("Logged in");
      navigate("/");
    }
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    mail: "",
    pass: "",
  });

  const handleLoginInputChange = (e, type) => {
    const newFormData = { ...formData };

    switch (type) {
      case "email":
        newFormData.email = e.target.value;
        break;
      case "password":
        newFormData.password = e.target.value;
        break;
      default:
        break;
    }
    setFormData(newFormData);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const userData = { email, password };
    dispatch(login(userData));
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
          value={formData.email}
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
          value={formData.password}
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
      <div className="row mb-4">
        <h1 className="display-1 mb-4 text-center">Login</h1>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">{loginForm}</div>
      </div>
    </div>
  );
};

export default Login;
