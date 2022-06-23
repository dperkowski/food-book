import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const handleInputChange = (e, type) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const userData = { email, password };
    dispatch(login(userData));
  };

  const form = (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span class="input-group-text">Email</span>
        <input
          type="text"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange(e, "email")}
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
          onChange={(e) => handleInputChange(e, "password")}
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
        <div className="col-md-6 offset-md-3">{form}</div>
      </div>
    </div>
  );
};

export default Login;
