import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import CookingBook from "./pages/CookingBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./assets/scss/main.scss";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route exact path="/" element={<CookingBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
