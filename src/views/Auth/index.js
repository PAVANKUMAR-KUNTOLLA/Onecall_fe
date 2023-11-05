import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Avatar, Typography, Box, Grid, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Your remaining components and code here
import Page from "../../components/Page";
import LoginView from "./LoginView";
import ForgotPasswordView from "./ForgotPassword";

const useStyles = makeStyles((theme) => ({
  box: {
    border: "1px solid #000000",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f7f7f7",
    // maxHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "350px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "280px",
      padding: "20px 10px",
    },
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

export const AppBar = () => {
  const customStyles = useStyles();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#fafafa",
        padding: "5px 20px",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
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
        sx={{
          width: "81px",
          height: "83px",
          display: { xs: "none", sm: "flex" },
        }}
      />

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Avatar
          variant="square"
          src="/static/img/onecall-logo.png"
          sx={{
            height: 50,
            width: 140,
            marginTop: "12px",
            marginBottom: "10px",
          }}
          className={customStyles.logoAvatar}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
          }}
        >
          PERFECT PLACE TO FILE YOUR TAXES
        </Typography>
      </Box>
    </Box>
  );
};

const Authentication = () => {
  const customStyles = useStyles();
  const navigate = useNavigate();

  return (
    <Page title="Login">
      <Box sx={{ backgroundColor: "#183360", height: "100vh" }}>
        <Container maxWidth="lg">
          <Box sx={{ backgroundColor: "#fafafa", padding: "5px 5px 30px" }}>
            <AppBar />
            <Box sx={{ padding: { xs: 0, sm: "20px 30px" } }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box className={customStyles.box}>
                    <LoginView />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className={customStyles.box}>
                    <ForgotPasswordView />
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">New Client? Please</Typography>

                <Avatar
                  onClick={() => navigate("/register")}
                  variant="square"
                  src="/static/img/register.png"
                  sx={{ height: 33, width: 99, marginLeft: "10px" }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default Authentication;
