import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"; // Import the red cross icon
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router for routing

function Cancelled() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5); // Initial timer duration in seconds
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
    navigate("/dashboard");
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
        height: "100vh",
      }}
    >
      <Card sx={{ width: "80%", maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            Cancelled
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CancelIcon sx={{ fontSize: 120, color: "red" }} />
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
              sx={{
                background: "#27374D",
                "&:hover": {
                  background: "#526D82",
                },
              }}
            >
              Navigate Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Cancelled;
