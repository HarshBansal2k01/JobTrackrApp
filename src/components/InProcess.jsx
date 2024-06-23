import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import QueueIcon from "@mui/icons-material/Queue";
import Popup from "reactjs-popup";
function InProcess({ jobs, updateJobStatus, uid, fetchAllJobs }) {
  const [processes, setProcesses] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentJobId, setCurrentJobId] = useState("");
  const [process, setProcess] = useState("");

  useEffect(() => {
    const fetchProcesses = async () => {
      const processesData = {};
      for (const job of jobs) {
        try {
          const response = await axios.get(`http://localhost:8080/getprocess`, {
            params: { jobId: job._id },
          });

          const processList = response.data
            .map((job) => job.process)
            .join(",")
            .split(",");
          processesData[job._id] = processList;
        } catch (error) {
          console.error(
            `Error fetching processes for job ID ${job._id}:`,
            error
          );
        }
      }
      setProcesses(processesData);
    };

    if (jobs.length > 0) {
      fetchProcesses();
    }
  }, [jobs]);

  const handleStatusChange = (id, event) => {
    updateJobStatus(id, event);
  };

  const handleAddProcess = async (jobId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/addprocess/${jobId}`,
        {
          uid,
          jobId,
          process,
        }
      );
      fetchAllJobs(uid);
      toast.success("Process added successfully!");

      setProcesses((prev) => ({
        ...prev,
        [jobId]: [...(prev[jobId] || []), response.data.process],
      }));
    } catch (error) {
      console.error("Error adding process:", error.message);
      toast.error("Error in Adding process", error.message);
    }
    setProcess("");
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProcess(currentJobId);
  };

  return (
    <div style={{ textAlign: "center", padding: "5px" }}>
      {jobs.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {jobs.map((jobData) => (
            <Card
              key={jobData._id}
              style={{ width: "25rem", marginBottom: "1rem" }}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "left",
                  }}
                >
                  <BusinessIcon style={{ fontSize: 30, marginRight: 10 }} />
                  {jobData.company_name}
                </Card.Title>

                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                    fontWeight: "normal",
                    color: "#555",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "left",
                  }}
                >
                  <AccountCircleOutlinedIcon
                    style={{ fontSize: 30, marginRight: 10 }}
                  />
                  {jobData.role}
                </Card.Title>

                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "18px",
                    fontWeight: "normal",
                    color: "#777",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "left",
                  }}
                >
                  <AttachMoneyOutlinedIcon
                    style={{ fontSize: 30, marginRight: 10 }}
                  />
                  {jobData.salary_range}
                </Card.Title>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ textAlign: "left" }}>
                      <Link to={jobData.link} style={{ alignItems: "left" }}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            height: "50px",
                            width: "80%",
                            justifyContent: "flex-start",
                            marginBottom: "19px",
                          }}
                        >
                          <InsertLinkIcon />
                          Company
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <FormControl sx={{ m: 1 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id={jobData._id}
                        value={jobData.status}
                        label="Status"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          handleStatusChange(jobData._id, e.target.value)
                        }
                      >
                        <MenuItem value="Applied">Applied</MenuItem>
                        <MenuItem value="InProcess">InProcess</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                      <FormHelperText>Change Status</FormHelperText>
                    </FormControl>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ flex: 1, minWidth: "150px" }}>
                    <Box display="flex" alignItems="center">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="add-note-label">Rounds</InputLabel>
                        <Select labelId="Rounds" label="Rounds">
                          {processes[jobData._id] &&
                          processes[jobData._id].length > 0 ? (
                            processes[jobData._id].map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No process added</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setCurrentJobId(jobData._id);
                          setIsOpen(true);
                        }}
                        style={{ marginLeft: "10px" }}
                      >
                        Add
                      </Button>
                    </Box>
                    <Popup
                      open={isOpen}
                      onClose={() => setIsOpen(false)}
                      modal
                      nested
                    >
                      <Box
                        textAlign="center"
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                        padding={3}
                        onSubmit={handleSubmit}
                      >
                        <FormControl>
                          <InputLabel htmlFor="round-name">
                            Round Name
                          </InputLabel>
                          <OutlinedInput
                            id="round-name"
                            label="Round Name"
                            required
                            value={process}
                            onChange={(e) => setProcess(e.target.value)}
                          />
                        </FormControl>
                        <Button
                          style={{
                            position: "absolute",
                            right: "10px",
                            bottom: "10px",
                          }}
                          variant="contained"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Box>
                    </Popup>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                textAlign: "center",
              }}
            >
              <QueueIcon style={{ fontSize: 50, marginRight: 10 }} />
            </Card.Title>
            <strong>No Jobs In-Process</strong>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default InProcess;
