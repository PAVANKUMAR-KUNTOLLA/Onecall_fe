import React, { useState, useEffect } from "react";

import { Container, Typography, Box, Grid, TextField } from "@mui/material";
import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";

const MyReferrer = () => {
  const [isReferralDetailsLoading, setIsReferralDetailsLoading] =
    useState(false);
  const [referralDetails, setReferralDetails] = useState({
    referralEmail: "",
    referralID: "",
  });

  const handleFetchProfileDetails = () => {
    setIsReferralDetailsLoading(true);
    privateApiGET(Api.profile)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setReferralDetails({
            ...referralDetails,
            referralEmail: data?.data["referred_by"],
            referralID: data?.data["referral_id"],
          });
          setIsReferralDetailsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsReferralDetailsLoading(false);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchProfileDetails();
    }
  }, []);

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
