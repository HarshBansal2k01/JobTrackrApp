import "./App.css";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { auth } from "./components/firebase.js";
function App() {
  const [user, setUser] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      console.log("User status:", user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or some other loading indicator
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
            <Route path="/login" element={user ? <Navigate to="/dashboard"/> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
