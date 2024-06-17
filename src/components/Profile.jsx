import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, styled } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CenteredCard = styled(Card)({
  maxWidth: 345,
  margin: "auto",
  marginTop: 50,
  textAlign: "center",
});

const ProfileImage = styled(CardMedia)({
  height: 140,
  width: 140,
  margin: "auto",
  borderRadius: "50%",
  objectFit: "cover",
});
function Profile({ fetchUserData, userDetails, uid }) {

  const navigate = useNavigate()

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

        <CenteredCard>
         
            <div style={{textAlign:"center"}}>
              {userDetails.photo ? (
                <CardMedia
                  component="img"
                  height="140"
                  src={userDetails.photo}
                  alt="Profile image"
                  style={{
                    marginTop:"10px",
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    display:'inline-block',
                    objectFit: "cover",
                  }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{ width: 140, height: 140, borderRadius: "50%" }}
                />
              )}
            </div>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {userDetails.lastName
                  ? userDetails.firstName + " " + userDetails.lastName
                  : userDetails.firstName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong> Email Address: </strong>
                {userDetails.email}
              </Typography>
            </CardContent>
         
        </CenteredCard>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
