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
import axios from "axios";
function Dashboard({fetchUserData , userDetails,uid }) {
  const navigate = useNavigate();

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [inProcessJobs, setInProcessJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);


  const fetchAllJobs = (uid) => {
    axios.get(`http://localhost:8080/getjobs?uid=${uid}`)
      .then((response) => {
        const jobs = response.data;
        setAppliedJobs(jobs.filter((job) => job.status === "Applied"));
        setInProcessJobs(jobs.filter((job) => job.status === "InProcess"));
        setCompletedJobs(jobs.filter((job) => job.status === "Completed"));
      })
      .catch((error) => {
        console.log("Error fetching jobs", error);
        toast.error("Error fetching jobs", error.message);
      });
  };
  

  useEffect(() => {
    fetchUserData();
    console.log("uid", uid)
    fetchAllJobs(uid);
  }, [uid]);

  const updateJobStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:8080/updatejob/${id}`, { status: newStatus })
      .then(() => {
        toast.success(`Status Updated Successfully to ${newStatus}`);
        fetchAllJobs(uid); 
      })
      .catch((err) => {
        console.error("Error updating status", err);
        toast.error(`Error Updating Status ${err.message}`);
      });
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
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {userDetails ? (
        <>
          <Navbar userDetails={userDetails} handleLogout={handleLogout} />
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Applied
                user_id={uid}
                jobs={appliedJobs}
                updateJobStatus={updateJobStatus}
                fetchAllJobs={fetchAllJobs}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <InProcess
              uid={uid}
                jobs={inProcessJobs}
                updateJobStatus={updateJobStatus}
                fetchAllJobs={fetchAllJobs}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Completed
              fetchAllJobs={fetchAllJobs}
              uid={uid}
                jobs={completedJobs}
                updateJobStatus={updateJobStatus}
              />
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
      <Footer />
    </div>
  );
}

export default Dashboard;
