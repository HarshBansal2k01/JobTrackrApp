import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Card, Form } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import.meta.env.BACKEND_URL;

const StatusDrop = [
  {
    value: "Applied",
  },
  {
    value: "InProcess",
  },
  {
    value: "Completed",
  },
];
function Applied({ user_id, jobs, updateJobStatus, fetchAllJobs }) {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [link, setLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dataForm, setDataForm] = useState([]);
  const [selectStatus, setSelectStatus] = useState("Applied");
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    uid: "",
    company_name: "",
    role: "",
    salary_range: "",
    status: "Applied",
    link: "",
  });
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSalaryRangeChange = (event) => {
    setSalaryRange(event.target.value);
  };

  const handleSelectStatus = (e) => {
    setSelectStatus(e.target.value);
    console.log(e.target.value);
  };

  const handleStatusChange = (id, event) => {
    console.log(event);
    // handleStatusUpdate(id, { status: event });
    // const updatedStatus = dataForm.map((status) => {
    //   if (status._id === id) {

    //     return { ...status, status: event };
    //   }
    //   return status;
    // });
    // setDataForm(updatedStatus);
    updateJobStatus(id, event);
  };
  // const handleStatusUpdate = (jobId, status) => {
  //   axios
  //     .put(`http://localhost:8080/updatejob/${jobId} `, status)
  //     .then((res) => {
  //       // setStatus(status);
  //       console.log("Status Updated Successfully", res);
  //       updateJobStatus(jobId, status.status);
  //       toast.success(`Status Updated Successfully to ${status.status}`);
  //     })
  //     .catch((err) => {
  //       console.log("Error updating status", err);
  //       toast.error(`Error Updating Status ${err.message}`);
  //     });
  // };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      uid: user_id,
      company_name: companyName,
      role: role,
      salary_range: salaryRange,
      status: selectStatus,
      link: link,
    };
    const isFormValid = Object.values(formData).every(
      (value) => value !== null && value !== ""
    );
    if (!isFormValid) {
      toast.error("Please fill in all the fields");
      return;
    } else if (isFormValid) {
      setFormValues(formData);
      axios
        .post("http://localhost:8080/AddJob", formData)
        .then((res) => {
          console.log("Job added successfully", res);
          toast.success("Job added successfully");
          fetchAllJobs();
        })
        .catch((err) => {
          console.error("Error adding job", err);
          toast.error(`Error adding job ${err.message}`);
        });
      setIsOpen(false);
      setCompanyName("");
      setRole("");
      setSalaryRange("");
      setSelectStatus("");
      setLink("");
    }
  };

  // const fetchAllJobs = () => {
  //   axios
  //     .get("http://localhost:8080/getjobs")
  //     .then((response) => {
  //       setDataForm(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("error fetching", error);
  //       toast.error("error fetching", error.message);
  //     });
  // };

  // useEffect(() => {
  //   fetchAllJobs();
  // }, []);
  return (
    <>
      <div style={{ textAlign: "center", padding: "5px" }}>
        <div style={{ marginTop: "5px" }}>
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
                      <BusinessIcon style={{ fontSize: 30, marginRight: 10 }} />{" "}
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
                          <Link
                            to={jobData.link}
                            style={{ alignItems: "left" }}
                            target= "_blank"
                          >
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
                              <InputAdornment position="start">
                                <InsertLinkIcon />
                              </InputAdornment>
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
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <div>No data available</div>
          )}
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Button variant="contained" onClick={() => setIsOpen(true)}>
              {" "}
              Add Job{" "}
            </Button>

            <Popup open={isOpen} onClose={() => setIsOpen(false)} modal nested>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
                padding={3}
              >
                <FormControl error={!!errors.companyName}>
                  <InputLabel htmlFor="component-outlined">
                    Company Name
                  </InputLabel>
                  <OutlinedInput
                    id="company-name"
                    label="Company Name"
                    onChange={handleCompanyNameChange}
                    required
                  />
                </FormControl>
                <FormControl error={!!errors.role}>
                  <InputLabel htmlFor="component-outlined">
                    Role Applied For
                  </InputLabel>
                  <OutlinedInput
                    id="role"
                    label="Role Applied For"
                    onChange={handleRoleChange}
                    required
                  />
                </FormControl>
                <FormControl error={!!errors.salaryRange}>
                  <InputLabel htmlFor="component-outlined">
                    Salary Range
                  </InputLabel>
                  <OutlinedInput
                    id="salary-range"
                    label="Salary Range"
                    onChange={handleSalaryRangeChange}
                    required
                  />
                </FormControl>
                <TextField
                  id="status"
                  select
                  label="Select"
                  defaultValue="Applied"
                  onChange={handleSelectStatus}
                  helperText="Please select your Status"
                  required
                >
                  {StatusDrop.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControl error={!!errors.link}>
                  <TextField
                    id="link"
                    label="Link"
                    helperText="Insert Link "
                    onChange={handleLinkChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InsertLinkIcon />
                        </InputAdornment>
                      ),
                    }}
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
        </form>
      </div>
    </>
  );
}

export default Applied;
