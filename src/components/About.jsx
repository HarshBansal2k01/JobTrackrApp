import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

function About({ fetchUserData, userDetails, uid }) {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar userDetails={userDetails} />
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
              About
            </Typography>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                width: "80%",
                maxWidth: 600,
              }}
            >
              <Typography variant="body1">
                JobTrackr helps in keeping track of the jobs you have applied
                for and the process you are in. The process is divided into
                three parts:
                <br />
                <br />
                <strong>Applied:</strong> Jobs you have applied for.
                <br />
                <strong>In Process:</strong> Jobs you are currently being
                considered for, with an option to add the specific process stage
                you are in.
                <br />
                <strong>Completed:</strong> Jobs for which the application
                process is finished.
                <br />
                <br />
                This helps job seekers to not lose track of their applications.
              </Typography>
            </Paper>
          </Box>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default About;
