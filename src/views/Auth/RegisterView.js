import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Avatar,
  MenuItem,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import CustomInputTextField from "../../components/CustomInputField";
import { AppBar } from ".";
import CustomAlert from "../../components/CustomAlert";

import * as Yup from "yup";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import Api from "../../components/Api";
import Page from "../../components/Page";
import PerfectScrollbar from "react-perfect-scrollbar";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
  },
  alert: {
    position: "absolute",
    right: 50,
    top: 50,
    [theme.breakpoints.down("sm")]: {
      right: 20,
      maxWidth: 250,
    },
  },
  logo: {
    width: 100,
  },
  menuPaper: {
    maxHeight: 200,
  },
  mainBlock: {
    // width: "100%",
    // height: "100vh",
    // display: "flex",
    // flexDirection: "row",
    padding: "10px 50px 20px",
    margin: "20px",
    border: "1px solid #000000",
    minWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
      minWidth: "350px",
      padding: "10px 0 10px 5px",
      margin: "10px 0",
    },
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  return (
    <Page title="Register">
      <Box
        sx={{
          height: "100vh",
          backgroundImage: "url(/static/img/green_bg.jpg)",
          paddingTop: "5%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: "#f7f7f7",
            }}
          >
            <AppBar />

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

              <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    gender: "",
                    email: queryParams.get("email"),
                    password: "",
                    passwordConfirmation: "",
                    referralId: queryParams.get("referralId"),
                    role: "CLIENT",
                  }}
                  validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                      .max(255)
                      .required("First Name is required"),
                    lastName: Yup.string()
                      .max(255)
                      .required("Last Name is required"),
                    gender: Yup.string().required("Gender is required"),
                    email: Yup.string()
                      .email("Must be a valid email")
                      .max(255)
                      .required("Email is required"),

                    password: Yup.string()
                      .required("Please enter your password")
                      .matches(
                        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                      ),
                    passwordConfirmation: Yup.string().when("password", {
                      is: (val) => (val && val.length > 0 ? true : false),
                      then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Both password need to be the same"
                      ),
                    }),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    const url = Api.signup;

                    const config = {
                      headers: {
                        "X-CSRFToken": Cookies.get("csrftoken"),
                      },
                    };

                    axios
                      .post(url, values, config)
                      .then((res) => {
                        if (res.status === 200) {
                          setShowAlert({
                            isAlert: true,
                            alertText: "Your are successfully registered.",
                            severity: "success",
                          });
                          setSubmitting(false);
                          resetForm();
                        }
                      })
                      .catch((error) => {
                        if (error.response) {
                          const { data } = error.response;
                          setShowAlert({
                            isAlert: true,
                            alertText: data?.["message"],
                            severity: "error",
                            alertTitle: "Error",
                          });
                          // resetForm();
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
                      <Typography
                        color="textPrimary"
                        variant="h4"
                        sx={{ marginBottom: "12px" }}
                      >
                        NEW USER REGISTRATION
                      </Typography>

                      <CustomInputTextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        is_required={true}
                        attribute="First Name"
                        margin="normal"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        variant="outlined"
                      />
                      <CustomInputTextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        is_required={true}
                        attribute="Last Name"
                        margin="normal"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        variant="outlined"
                      />
                      <CustomInputTextField
                        error={Boolean(touched.gender && errors.gender)}
                        select
                        fullWidth
                        helperText={touched.gender && errors.gender}
                        is_required={true}
                        attribute="Gender"
                        margin="normal"
                        name="gender"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.gender}
                        variant="outlined"
                      >
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMALE">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </CustomInputTextField>
                      <CustomInputTextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        is_required={true}
                        attribute="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />

                      <CustomInputTextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        is_required={true}
                        attribute="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                      <CustomInputTextField
                        error={Boolean(
                          touched.passwordConfirmation &&
                            errors.passwordConfirmation
                        )}
                        fullWidth
                        helperText={
                          touched.passwordConfirmation &&
                          errors.passwordConfirmation
                        }
                        is_required={true}
                        attribute="Confirm Password"
                        margin="normal"
                        name="passwordConfirmation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.passwordConfirmation}
                        variant="outlined"
                      />
                      <CustomInputTextField
                        error={Boolean(touched.referralId && errors.referralId)}
                        fullWidth
                        helperText={touched.referralId && errors.referralId}
                        is_required={false}
                        attribute="Referral Id (Optional)"
                        margin="normal"
                        name="referralId"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.referralId}
                        variant="outlined"
                      />
                      <Box my={2}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Register
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  sx={{ textAlign: "center" }}
                >
                  Have an account?{" "}
                  <Button component="span" onClick={() => navigate("/login")}>
                    Sign in
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
