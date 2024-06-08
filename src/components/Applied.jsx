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
function Applied() {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [status, setStatus] = useState("Applied");
  const [link, setLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState([]);

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSalaryRangeChange = (event) => {
    setSalaryRange(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = () => {
    const newData = {
      companyName,
      role,
      salaryRange,
      status,
      link,
    };
    setFormData([...formData, newData]); // Append new data to array
    setIsOpen(false); // Close the popup
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <>
      <div style={{ textAlign: "center", padding: "5px" }}>
        <div style={{ marginTop: "5px" }}>
          {formData.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {formData.map((jobData) => (
                <Card
                  key={jobData.companyName}
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
                      {jobData.companyName}
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
                      {jobData.salaryRange}
                    </Card.Title>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ textAlign: "left" }}>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              height: "50px",
                              width: "80%",
                              justifyContent: "flex-start",
                              marginBottom:"19px"
                            }}
                          >
                            <Link
                              to={jobData.link}
                              style={{ alignItems: "left" }}
                            >
                              <InputAdornment position="start">
                                <InsertLinkIcon />
                              </InputAdornment>
                              
                            </Link>
                            Company
                          </Button>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <FormControl sx={{ m: 1 }}>
                          <InputLabel id="demo-simple-select-helper-label">
                            Status
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={jobData.status}
                            label="Status"
                            style={{ width: "100%" }} // Make the select take full width
                          >
                            {StatusDrop.map((status, index) => (
                              <MenuItem key={index} value={status.value}>
                                {status.value}
                              </MenuItem>
                            ))}
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
        <div style={{ marginTop: "10px" , marginBottom:"10px" }}>
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
              <FormControl>
                <InputLabel htmlFor="component-outlined">
                  Company Name
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  label="Company Name"
                  onChange={handleCompanyNameChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">
                  Role Applied For
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  label="Role Applied For"
                  onChange={handleRoleChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">
                  Salary Range
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  label="Salary Range"
                  onChange={handleSalaryRangeChange}
                />
              </FormControl>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue="Applied"
                onChange={handleStatusChange}
                helperText="Please select your Status"
              >
                {StatusDrop.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                label="Link"
                helperText="Insert Link "
                onChange={handleLinkChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InsertLinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                style={{ position: "absolute", right: "10px", bottom: "10px" }}
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Popup>
        </div>
      </div>
    </>
  );
}

export default Applied;
