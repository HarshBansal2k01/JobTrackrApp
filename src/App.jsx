import "./App.css";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { auth } from "./components/firebase.js";
import { ColorRing } from "react-loader-spinner";
import About from "./components/About.jsx";

function App() {
  const [user, setUser] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      console.log("User status:", user);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {" "}
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }
  return (
    <Router>
      <div>
        <ToastContainer />
        <div>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/about"
              element={user ? <About /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
