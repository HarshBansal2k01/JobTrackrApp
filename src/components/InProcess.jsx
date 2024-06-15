import React from "react";
import { Card, Form } from "react-bootstrap";
import { Button, InputLabel } from "@mui/material";
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
function InProcess({ jobs, updateJobStatus}) {
  const handleStatusChange = (id, event) => {
    console.log(event);

    updateJobStatus(id, event);
  };
  return (
    <>
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
    </>
  );
}

export default InProcess;
