import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import CookingBook from "./pages/CookingBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./assets/scss/main.scss";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const { recipe, userRecipe, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );
  return (
    <>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route exact path="/" element={<CookingBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {user ? (
            <Route path="/user-profile" element={<UserProfile />} />
          ) : null}
        </Routes>
      </Layout>
    </>
  );
};

export default App;
