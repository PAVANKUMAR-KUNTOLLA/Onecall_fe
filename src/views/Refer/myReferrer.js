import { Container, Typography, Box, Grid, TextField } from "@mui/material";
import React from "react";

const MyReferrer = () => {
  const referralDetails = {
    referralId: "",
    referralEmail: "",
  };

  return (
    <Box>
      <Container>
        <Box>
          <Typography variant="h5">Referral Details</Typography>
          <Grid container>
            <Grid item sm={5} xs={12} sx={{ marginRight: "20px" }}>
              <TextField
                fullWidth
                label="Referral ID"
                margin="normal"
                name="referralID" // Updated name
                disabled
                value={referralDetails.referralID} // Updated value
                variant="outlined"
              />
            </Grid>
            <Grid item sm={5} xs={12} sx={{ marginRight: "20px" }}>
              <TextField
                fullWidth
                label="Referral Email"
                margin="normal"
                name="referralEmail" // Updated name
                value={referralDetails.referralEmail} // Updated value
                variant="outlined"
                disabled
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default MyReferrer;
