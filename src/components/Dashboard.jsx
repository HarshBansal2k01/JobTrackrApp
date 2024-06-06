import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ColorRing } from "react-loader-spinner";
import Applied from "./Applied";
import InProcess from "./InProcess";
import Completed from "./Completed";
import Grid from "@mui/material/Grid";

function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User not logged in");
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    {userDetails ? (
        <>
          <Navbar userDetails={userDetails} handleLogout={handleLogout} />
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Applied />
            </Grid>
            <Grid item xs={6} md={4}>
              <InProcess />
            </Grid>
            <Grid item xs={6} md={4}>
              <Completed />
            </Grid>
          </Grid>

        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
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
      )}
      <Footer/>
    </div>
  );
}

export default Dashboard;
