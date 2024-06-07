import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

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
              }}
            >
              <Card style={{ width: "25rem" }}>
                <Card.Body>
                  {formData.map(
                    (
                      jobData // Use entire object 'jobData'
                    ) => (
                      <div key={jobData.companyName}>
                        {" "}
                        <Card.Title>
                          Company Name: {jobData.companyName}
                        </Card.Title>
                        <Card.Title>
                          Role Applied For: {jobData.role}
                        </Card.Title>
                        <Card.Title>
                          Salary Range: {jobData.salaryRange}
                        </Card.Title>
                        <Card.Title>
                          Status: {jobData.status}
                        </Card.Title>
                        <Card.Title>
                          Link: {jobData.link}
                        </Card.Title>
                       
                      </div>
                    )
                  )}
                </Card.Body>
              </Card>
            </div>
          ) : (
            <div>No data available</div>
          )}
        </div>
        <div style={{ marginTop: "10px" }}>
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
