import React from "react";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
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
  return (
    <div style={{ textAlign: "center", padding: "5px" }}>
      <Popup trigger={<Button variant="contained"> Add Job </Button>} modal>
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
            <InputLabel htmlFor="component-outlined">Company Name</InputLabel>
            <OutlinedInput id="component-outlined" label="Company Name" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">
              Role Applied For
            </InputLabel>
            <OutlinedInput id="component-outlined" label="Role Applied For" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Salary Range</InputLabel>
            <OutlinedInput id="component-outlined" label="Salary Range" />
          </FormControl>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="Applied"
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
          >
            Submit
          </Button>
        </Box>
      </Popup>
    </div>
  );
}

export default Applied;
