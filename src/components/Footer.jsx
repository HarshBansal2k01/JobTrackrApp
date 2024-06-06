import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from "@mui/material";
import { Instagram, LinkedIn, Twitter } from "@mui/icons-material";

function Footer() {
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
        <Grid container justifyContent="center"  sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="body2" align="center" marginBottom={1} >
              contact@jobtrackr.com
            </Typography>
            <Typography variant="body2" align="center" marginBottom={1} >
              1234 Job Street, City, Country
            </Typography>
            <Typography variant="body2" align="center" marginBottom={1} >
              +1 (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        {/* Bottom section */}
        <Grid container justifyContent="space-between" alignItems="center" marginTop={-15}>
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
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram fontSize="large" />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn fontSize="large" />
            </IconButton>
            <IconButton
              href="https://twitter.com/"
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
