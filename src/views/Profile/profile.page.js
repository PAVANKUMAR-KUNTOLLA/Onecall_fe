import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Typography,
  TextField,
  useMediaQuery,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";

import { useDispatch } from "react-redux";

const customProfileStyles = makeStyles((theme) => ({
  mainBlock: {
    marginTop: "50px",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
  },
  account: {
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginBottom: "10px",
    },
  },
  title: {
    textTransform: "uppercase",
    color: "#3e4152",
    fontSize: "28px",
    fontWeight: "700",
    marginTop: "34px",
    marginBottom: "10px",
    letterSpacing: "1.5px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      fontSize: "20px",
      letterSpacing: "0.5px",
    },
  },
  subTitle: {
    textTransform: "uppercase",
    color: "#3e4152",
    fontSize: "20px",
    fontWeight: "500",
    textAlign: "left",
    marginTop: "24px",
    letterSpacing: "1px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      letterSpacing: "0.5px",
    },
  },
}));

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone_no: "",
    address: "",
  });

  const [scrollEl, setScrollEl] = useState();
  const customStyles = customProfileStyles();

  const handleFetchProfileData = () => {
    privateApiGET(Api.profile)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          let info = data?.data;
          setUserInfo((prev) => ({
            ...prev,
            id: info.id,
            first_name: info.first_name,
            last_name: info.last_name,
            gender: info.gender,
            email: info.email,
            phone_no: info.phone_no,
            address: info.address,
          }));
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  function stringAvatar(name) {
    if (name.split(" ").length == 1) {
      return {
        children: `${name.split(" ")[0][0]}`,
      };
    }
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchProfileData();
    }
  }, []);

  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = 100;
    }
  }, [scrollEl]);

  return (
    <Page title="Profile">
      <Container maxWidth="md" className={customStyles.mainBlock}>
        <Box className={customStyles.account}>
          {userInfo.first_name && (
            <Avatar
              {...stringAvatar(userInfo.first_name + userInfo.last_name)}
              sx={{
                width: "100px",
                height: "100px",
                fontSize: "48px",
                color: "white",
                backgroundColor: "rgb(0,76,153,0.8)",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          )}

          <Typography
            sx={{ fontWeight: "700", marginTop: "10px", fontSize: "16px" }}
          >
            {userInfo.first_name} {userInfo.last_name}
          </Typography>

          <Card sx={{ marginTop: "20px" }}>
            <CardHeader
              subheader={"This information can't be edited"}
              title={"PROFILE"}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                      <TextField
                        fullWidth
                        label="First_Name"
                        name="name"
                        value={userInfo?.["first_name"]}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        fullWidth
                        label="Last_Name"
                        name="name"
                        value={userInfo?.["last_name"]}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        fullWidth
                        label="Gender"
                        name="name"
                        value={userInfo?.["gender"]}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={userInfo?.["email"]}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone_no"
                        value={userInfo ? userInfo["phone_no"] : ""}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={userInfo ? userInfo["address"] : ""}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default ProfilePage;
