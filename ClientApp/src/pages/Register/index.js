import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { register, reset } from "../../features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const handleLoginInputChange = (e, type) => {
    const newRegisterValue = { ...formData };

    switch (type) {
      case "email":
        newRegisterValue.email = e.target.value;
        break;
      case "password":
        newRegisterValue.password = e.target.value;
        break;
      case "password2":
        newRegisterValue.password2 = e.target.value;
        break;
      default:
        break;
    }
    setFormData(newRegisterValue);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const { email, password, password2 } = formData;

    if (password !== password2) {
      toast.error("Passwords do not mach");
    } else {
      const userData = {
        email,
        password,
      };
      console.log(userData);
      dispatch(register(userData));
    }
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

      <div className="input-group mb-3">
        <span class="input-group-text">Password</span>
        <input
          type="password"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleLoginInputChange(e, "password")}
        ></input>
      </div>

      <div className="input-group">
        <span class="input-group-text">Repeat password</span>
        <input
          type="password"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Repeat password"
          value={formData.password2}
          onChange={(e) => handleLoginInputChange(e, "password2")}
        ></input>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  );

  return (
    <div className="container mt-auto">
      <div className="row mb-4">
        <h1 className="display-1 mb-4 text-center">Register</h1>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">{loginForm}</div>
      </div>
    </div>
  );
};

export default Register;
