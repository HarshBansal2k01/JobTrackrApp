import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("user not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

 const handleLogout = async ()=>{
  try{
    await auth.signOut();
    navigate('/login')
    console.log("logged out")
  }catch(error){
    console.log("error logging out",error)
  }
 }
  return (
    <div>
      {userDetails ? (
        <>
          <h3>{userDetails.firstName}</h3>
          <div>
            <p>{userDetails.email}</p>
            <p>{userDetails.lastName}</p>
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
