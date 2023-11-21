import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import CustomInputTextField from "../../components/CustomInputField";
import { makeStyles } from "@mui/styles";
import { AppBar } from ".";
import CustomAlert from "../../components/CustomAlert";

import * as Yup from "yup";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import Api from "../../components/Api";

import Page from "../../components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    position: "relative",
  },

  logo: {
    width: 150,
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      width: 110,
    },
  },
  submitProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  mainBlock: {
    // width: "100%",
    // height: "100vh",
    // display: "flex",
    // flexDirection: "row",
    padding: "10px 50px 20px",
    margin: "20px",
    border: "1px solid #000000",
    minWidth: "600px",
    minHeight: "300px",
    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
      minWidth: "350px",
      padding: "10px 0 10px 5px",
      margin: "10px 0",
      minHeight: "280px",
    },
  },
}));

const ResetPasswordView = ({ match }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  return (
    <Page title="Reset Password">
      <Box sx={{ backgroundColor: "#183360", height: "100vh" }}>
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
                    password: "",
                    passwordConfirmation: "",
                  }}
                  validationSchema={Yup.object().shape({
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
                    const url = Api.resetPassword;

                    let data = {
                      password: values["password"],
                      uidb64: params.uidb64,
                      token: params.token,
                    };

                    const config = {
                      headers: {
                        "X-CSRFToken": Cookies.get("csrftoken"),
                      },
                    };

                    axios
                      .post(url, data, config)
                      .then((res) => {
                        const { status, data } = res;
                        if (status === 200) {
                          setSubmitting(false);
                          setShowAlert({
                            isAlert: true,
                            alertText: data?.["message"],
                            severity: "success",
                          });
                          resetForm();
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                        setSubmitting(false);
                        setShowAlert({
                          isAlert: true,
                          alertText: "Something went wrong",
                          severity: "error",
                          alertTitle: "Error",
                        });
                        resetForm();
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
                        sx={{ marginBottom: "16px" }}
                      >
                        Reset Password
                      </Typography>

                      <CustomInputTextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
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
                        attribute="Confirm Password"
                        margin="normal"
                        name="passwordConfirmation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.passwordConfirmation}
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
                          Reset Password
                          {isSubmitting && (
                            <CircularProgress
                              size={24}
                              className={classes.submitProgress}
                            />
                          )}
                        </Button>
                      </Box>
                      <Typography
                        color="textSecondary"
                        variant="body1"
                        sx={{ textAlign: "center" }}
                      >
                        Go back to{" "}
                        <Link component={RouterLink} to="/login" variant="h6">
                          Sign in
                        </Link>
                      </Typography>
                    </form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default ResetPasswordView;
