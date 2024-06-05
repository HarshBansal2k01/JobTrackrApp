import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    <div>
      {userDetails ? (
        <>
          <img
            src={userDetails.photo}
            width={"40%"}
            style={{ borderRadius: "50%" }}
          />
          <h3>{userDetails.firstName}</h3>
          <div>
            <p>{userDetails.email}</p>
            <p>
              {userDetails.lastName
                ? userDetails.lastName
                : userDetails.firstName.split(" ").pop()}
            </p>
          </div>
        </>
      ) : (
        <p>loading....</p>
      )}
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
