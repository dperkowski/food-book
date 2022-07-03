import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login, reset } from "../../features/auth/authSlice";

import UserRecipes from "./UserRecipes.jsx";
import AddRecipe from "../../components/recipes/AddRecipe.jsx";

const UserProfile = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="container mt-auto">
      <div className="row">
        <h1 className="display-1 mb-4 text-center">User profile</h1>
      </div>

      <div className="row">
        <h2 className="display-2 mb-5 text-center">Hello, {user?.name}</h2>
      </div>

      <div className="row">
        <div className="col-md-12">
          <AddRecipe />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <UserRecipes />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
