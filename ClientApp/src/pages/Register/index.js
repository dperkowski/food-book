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
    if (isSuccess || user) {
      toast.success("Logged in");
      navigate("/");
    }
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    pass: "",
    pass2: "",
  });

  const handleLoginInputChange = (e, type) => {
    const newRegisterValue = { ...formData };

    switch (type) {
      case "name":
        newRegisterValue.name = e.target.value;
        break;
      case "email":
        newRegisterValue.mail = e.target.value;
        break;
      case "password":
        newRegisterValue.pass = e.target.value;
        break;
      case "password2":
        newRegisterValue.pass2 = e.target.value;
        break;
      default:
        break;
    }
    setFormData(newRegisterValue);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const { name, mail, pass, pass2 } = formData;

    if (!name || !mail || !pass || !pass2) {
      return toast.error("Oops... Try to fill all fields");
    }

    if (
      name.length < 6 ||
      mail.length < 6 ||
      pass.length < 6 ||
      pass2.length < 6
    ) {
      return toast.error(
        "Oops... Name, email or password may be too short (min. 6 characters)"
      );
    }

    if (pass !== pass2) {
      return toast.error("Passwords do not mach");
    } else {
      const userData = {
        name,
        mail,
        pass,
      };
      dispatch(register(userData));
    }
  };

  const form = (
    <form onSubmit={handleLoginSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text">Name</span>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleLoginInputChange(e, "name")}
        ></input>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Email</span>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={formData.mail}
          onChange={(e) => handleLoginInputChange(e, "email")}
        ></input>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Password</span>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={formData.pass}
          onChange={(e) => handleLoginInputChange(e, "password")}
        ></input>
      </div>

      <div className="input-group">
        <span className="input-group-text">Repeat password</span>
        <input
          type="password"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Repeat password"
          value={formData.pass2}
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
        <div className="col-md-6 offset-md-3">{form}</div>
      </div>
    </div>
  );
};

export default Register;
