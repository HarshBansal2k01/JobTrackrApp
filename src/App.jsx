import "./App.css";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dashboard from "./components/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { auth, db } from "./components/firebase.js";
import { ColorRing } from "react-loader-spinner";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Donate from "./components/Donate.jsx";
import { doc, getDoc } from "firebase/firestore";
import Profile from "./components/Profile.jsx";
import Success from "./components/Success.jsx";
import Cancelled from "./components/Cancelled.jsx";
function App() {
  // const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {}, [userDetails]);

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

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setUid(user.uid);
          } else {
            toast.error("No user data found!");
          }
        } catch (error) {
          toast.error("Error fetching user data: " + error.message);
        }
      } else {
        window.location.href("/login");
      }
    });
  };

  return (
    <>
      <div className="App" style={{ background: "#DDE6ED" }}>
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
                  element={
                    user ? (
                      <Dashboard
                        fetchUserData={fetchUserData}
                        userDetails={userDetails}
                        uid={uid}
                      />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/about"
                  element={
                    user ? (
                      <About
                        fetchUserData={fetchUserData}
                        userDetails={userDetails}
                        uid={uid}
                      />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/contact"
                  element={
                    user ? (
                      <Contact
                        uid={uid}
                        fetchUserData={fetchUserData}
                        userDetails={userDetails}
                      />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/donate"
                  element={
                    user ? (
                      <Donate
                        uid={uid}
                        fetchUserData={fetchUserData}
                        userDetails={userDetails}
                      />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    user ? (
                      <Profile
                        uid={uid}
                        fetchUserData={fetchUserData}
                        userDetails={userDetails}
                      />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route path="/success" element={<Success />} />
                <Route path="/cancelled" element={<Cancelled />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
