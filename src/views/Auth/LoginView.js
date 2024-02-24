import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "../../components/CustomAlert";

import * as Yup from "yup";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import Api from "../../components/Api";
import Page from "../../components/Page";
import { setTaxYear } from "../../redux/app/appSlice";

import CustomInputTextField from "../../components/CustomInputField";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   backgroundColor: theme.palette.background.dark,
  //   height: "100%",
  //   paddingBottom: "0px",
  //   paddingTop: "0px",
  //   position: "relative",
  // },

  // logo: {
  //   width: 150,
  //   padding: 10,
  //   [theme.breakpoints.down("sm")]: {
  //     width: 110,
  //   },
  // },
  submitProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  mainBlock: {
    // width: "50vw",
    // height: "100vh",
    // display: "flex",
    // flexDirection: "row",
    minWidth: "400px",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
      minWidth: "300px",
    },
  },
  // leftSide: {
  //   width: "70%",
  //   height: "100vh",
  //   position: "relative",
  //   backgroundColor: "#2069D8",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "100%",
  //     height: "40vh",
  //     margin: "0",
  //   },
  // },

  avatarLogo: {
    width: 200,
    height: 72,
    position: "absolute",
    top: "50%",
    left: "33%",
    [theme.breakpoints.down("sm")]: {
      left: "20%",
      top: "30%",
    },
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "72px",
    textAlign: "center",
    lineHeight: "87.7px",
    color: "#FFFFFF",
    margin: "auto",
    marginTop: "50vh",
    marginBottom: "auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10vh",
    },
  },

  rightSide: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    margin: "0",
    paddingRight: "200px",
    padding: "0", // Reset padding
    [theme.breakpoints.up("md")]: {
      paddingLeft: "244px", // Adjust padding for medium and larger screens
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Set width to 100%
      paddingLeft: "0", // Reset padding
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      paddingRight: "0px",
      marginTop: "-100px",
    },
  },
  "& .css-t7eypm-MuiTypography-root": {
    fontWeight: "700",
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  return (
    <>
      <Box className={classes.mainBlock}>
        {showAlert.isAlert ? (
          <CustomAlert
            open={showAlert.isAlert}
            severity={showAlert.severity}
            alertTitle={showAlert.alertTitle}
            alertText={showAlert.alertText}
            onClose={() =>
              setShowAlert({
                isAlert: false,
                alertTitle: "",
                alertText: "",
                severity: "",
              })
            }
          />
        ) : null}
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom={2}
            >
              
            </Box> */}
          <Formik
            initialValues={{
              email: "",
              password: "",
              // taxYear: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string().max(255).required("Password is required"),
              // taxYear: Yup.string()
              //   .max(255)
              //   .required("Tax Year is required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const url = Api.login;

              const config = {
                headers: {
                  "X-CSRFToken": Cookies.get("csrftoken"),
                },
              };

              axios
                .post(url, values, config)
                .then((res) => {
                  if (res.status === 200) {
                    window.sessionStorage.setItem(
                      "token",
                      res.data?.data?.token
                    );
                    setSubmitting(false);
                    dispatch(setTaxYear(values.taxYear));
                    navigate("/");
                  }
                })
                .catch((error) => {
                  if (error.response.status === 400) {
                    setShowAlert({
                      isAlert: true,
                      alertText: "Invalid credentials",
                      severity: "error",
                      alertTitle: "Error",
                    });
                    setSubmitting(false);
                  } else {
                    setShowAlert({
                      isAlert: true,
                      alertText: "Something went wrong",
                      severity: "error",
                      alertTitle: "Error",
                    });
                    resetForm();
                    setSubmitting(false);
                  }
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h4">
                    SIGN IN TO YOUR ACCOUNT
                  </Typography>
                </Box>

                <CustomInputTextField
                  attribute="Email Address"
                  is_required={true}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  is_bold={true}
                />
                <CustomInputTextField
                  attribute="Password"
                  is_required={true}
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  is_bold={true}
                />
                {/* <TextField
                        select
                        error={Boolean(touched.taxYear && errors.taxYear)}
                        helperText={touched.taxYear && errors.taxYear}
                        fullWidth
                        label="Tax Year"
                        margin="normal"
                        name="taxYear" // Change "taxyear" to "taxYear"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.taxYear}
                        variant="outlined"
                      >
                        <MenuItem value="currentYear">Current Year</MenuItem>
                        <MenuItem value="AllYears">All Years</MenuItem>
                      </TextField> */}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default LoginView;
