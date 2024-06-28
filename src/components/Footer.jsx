import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { toast } from "react-toastify";

function Footer() {
  const email = "bansalharsh0914@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        toast.success("Email Copied!!");
      },
      (err) => {
        toast.error("Failed to copy" + err.message);
      }
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        {/* Top section */}
        <Typography variant="h5" align="center" gutterBottom>
          JobTrackr
        </Typography>
        {/* Middle section */}
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography
              type="button"
              variant="body2"
              align="center"
              marginBottom={1}
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={copyToClipboard}
            >
              <Tooltip title="Click to copy email">
                bansalharsh0914@gmail.com
              </Tooltip>
            </Typography>

            <Typography variant="body2" align="center" marginBottom={1}>
              Guwahati, Assam
            </Typography>
          </Grid>
        </Grid>
        {/* Bottom section */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          marginTop={-15}
        >
          <Grid item>
            <Typography
              variant="body1"
              fontWeight="bold"
              fontSize={40}
              align="left"
              marginLeft={-10}
            >
              One Stop
              <br />
              Job Tracking Solution
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <IconButton
              href="https://www.instagram.com/hhharsh_bansalll/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram fontSize="large" />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/harsh-bansal-7441331b6/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn fontSize="large" />
            </IconButton>
            <IconButton
              href="https://x.com/hbbro14"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={2}
        >
          {"© "}
          <Link color="inherit" href="https://jobtrackr.com/">
            JobTrackr
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
