import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login, reset } from "../../features/auth/authSlice";

const UserProfile = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [loggedUser, setLoggedUser] = useState(...user);

  return (
    <div className="container mt-auto">
      <div className="row">
        <h1 className="display-1 mb-4 text-center">User profile</h1>
      </div>

      <div className="row">
        <h2 className="display-2 mb-4 text-center">Hello, {loggedUser.name}</h2>
      </div>
    </div>
  );
};

export default UserProfile;
