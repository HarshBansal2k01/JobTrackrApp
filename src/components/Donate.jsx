import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { toast } from "react-toastify";

function Donate({ fetchUserData, userDetails, uid }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      toast.success("logged out");
      console.log("logged out");
    } catch (error) {
      toast.error("error logging out", error.message);
      console.log("error logging out", error);
    }
  };
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar userDetails={userDetails} handleLogout={handleLogout} />
        <div>
  
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Donate;
