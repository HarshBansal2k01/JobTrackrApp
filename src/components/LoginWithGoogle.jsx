import React from "react";
import Logo from "../asset/images/google login image.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
function LoginWithGoogle() {
  const navigate = useNavigate();
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (res) => {
      console.log(res);
      const user = res.user;
      if (res.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully");
        navigate("/dashboard");
      }
    });
  };
  return (
    <div>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          color: "gray",
          marginBottom: "-5px",
        }}
      >
        --Or Login With--
      </p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={Logo} width={"60%"} />
      </div>
    </div>
  );
}

export default LoginWithGoogle;
