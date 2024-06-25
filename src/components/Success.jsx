import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom"; 

function Success() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5); 
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (timerActive && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timerActive && seconds === 0) {
      handleRedirect();
    }
  }, [timerActive, seconds]);

  const handleRedirect = () => {
    if (timerActive) {
      navigate("/dashboard"); 
    }
  };

  const handleManualNavigation = () => {
    setTimerActive(false);
    handleRedirect(); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Adjust as needed to center vertically
      }}
    >
      <Card sx={{ width: "80%", maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            Success
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 120, color: "green" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography variant="body1">
              Redirecting in {seconds} seconds...
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleManualNavigation}
            >
              Navigate Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Success;
