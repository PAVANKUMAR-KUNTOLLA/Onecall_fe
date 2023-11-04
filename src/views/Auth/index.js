import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import { Avatar, Typography, Box, Grid, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Your remaining components and code here
import Page from "../../components/Page";
import LoginView from "./LoginView";
const useStyles = makeStyles((theme) => ({
  box: {
    border: "1px solid #000000",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f7f7f7",
    maxHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginView: {
    maxWidth: "100%", // Adjust the maximum width as needed
  },
  mainBlock: {
    backgroundImage: "url(/static/img/header.png)",
    backgroundSize: "100% 100%",
    padding: "10px 0",
  },
  logoAvatar: {
    [theme.breakpoints.up("sm")]: {
      //   marginLeft: "200px",
      marginRight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "150px",
    },
  },
}));

const Authentication = () => {
  const customStyles = useStyles();
  return (
    <Page title="Login">
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Avatar
                variant="square"
                src="/static/img/onecall-logo.png"
                sx={{
                  height: 50,
                  width: 140,
                  marginBottom: "10px",
                }}
                className={customStyles.logoAvatar}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: "16px",
                  marginTop: "12px",
                  marginLeft: "20px",
                }}
              >
                PERFECT PLACE TO FILE YOUR TAXES
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontSize: "16px" }}>
              <strong>Phone:</strong> (248) 971-3300
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "16px" }}>
              <strong>E-mail:</strong> Onecalltaxservices.digital@gmail.com
            </Typography>
          </Box>
          <Avatar
            variant="square"
            src="/static/img/irs_image.jpg"
            sx={{ width: "81px", height: "83px" }}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className={customStyles.box}>
              <LoginView className={customStyles.loginView} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={customStyles.box}>
              <LoginView className={customStyles.loginView} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Authentication;
