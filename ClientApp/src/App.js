import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import CookingBook from "./pages/CookingBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./custom.css";

const App = () => {
  const notify = () => toast("Wow so easy!");
  const displayName = App.name;
  return (
    <>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/fetch-data" element={<FetchData />} />
          <Route path="/cooking-book" element={<CookingBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
