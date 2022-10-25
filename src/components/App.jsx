import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MadeWthLove from "./MadeWithLove";

const App = () => {
  const { user } = useAuth();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
        <Route
          path="/forgot-password"
          element={user ? <Navigate replace to="/" /> : <ForgotPassword />}
        />
      </Routes>
      <MadeWthLove />
    </>
  );
};

export default App;
