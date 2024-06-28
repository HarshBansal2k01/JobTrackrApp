import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Typography } from "@mui/material";
import { Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { toast } from "react-toastify";

function Contact({ fetchUserData, userDetails, uid }) {
  const email = "bansalharsh0914@gmail.com";

  const handleClick = () => {
    window.open(`mailto:${email}`);
  };

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      toast.success("logged out");
    } catch (error) {
      toast.error("error logging out" + error.message);
    }
  };
  useEffect(()=>{
    fetchUserData()
  },[])
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar userDetails={userDetails} handleLogout={handleLogout}/>
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3%",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                width: "80%",
                maxWidth: 600,
              }}
            >
             
                <IconButton
                  href="https://www.instagram.com/hhharsh_bansalll/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/harsh-bansal-7441331b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://x.com/hbbro14"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  <Twitter fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={handleClick}
                  aria-label="Email"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EmailIcon fontSize="large" />
                </IconButton>
                <br /><br />
                <Typography variant="body1">
                Please contact us from the above handles
                <br/><br/>
                <strong>Thank You</strong>
              </Typography>
            </Paper>
          </Box>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Contact;
