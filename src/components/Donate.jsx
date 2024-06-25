import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { Add, Remove } from "@mui/icons-material";

function Donate({ fetchUserData, userDetails, uid }) {
  const navigate = useNavigate();

  const itemName = "Donation";
  const itemPrice = 10;
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(itemPrice);

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setFinalAmount(itemPrice);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
      setFinalAmount(finalAmount - itemPrice);
    }
  };
  const increment = () => {
    setQuantity(quantity + 1);
    setFinalAmount(finalAmount + itemPrice);
  };

  const checkout = async () => {
    try {
      const res = await fetch("http://localhost:8080/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          items: [
            {
              id: 1,
              quantity: quantity,
              price: itemPrice,
              name: itemName,
            },
          ],
        }),
      });
      const data = await res.json();
      console.log(data);
      window.location = data.url;
    } catch (error) {
      console.log("Error-> ", error);
    }
  };

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
        <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Make a Donation
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="2rem"
          >
            <IconButton onClick={decrement}>
              <Remove />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              inputProps={{ style: { textAlign: "center" } }}
            />
            <IconButton onClick={increment}>
              <Add />
            </IconButton>
          </Box>
          <Typography variant="h6" align="center" marginTop="1rem">
            Total Amount: ${finalAmount}
          </Typography>
          <Box display="flex" justifyContent="center" marginTop="2rem">
            <Button
              variant="contained"
              sx={{
                background: "#27374D",
                "&:hover": {
                  background: "#526D82",
                },
              }}
              onClick={checkout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Container>

        <Footer />
      </div>
    </>
  );
}

export default Donate;
