import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

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
      //   flexDirection: "column",
      minWidth: "300px",
    },
  },
}));

const ForgotPasswordView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordState, setForgetPasswordState] = useState({ email: "" });
  const [isResetPasswordSubmitting, setIsRestPasswordSubmitting] =
    useState(false);

  const handleForgotPassword = () => {
    const url = Api.forgotPassword;
    setIsRestPasswordSubmitting(true);
    const config = {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    axios
      .post(url, forgotPasswordState, config)
      .then((res) => {
        setShowAlert({
          isAlert: true,
          alertText: res.data["message"],
          severity: "success",
        });
        setIsForgotPassword(false);
        setIsRestPasswordSubmitting(false);
        setForgetPasswordState({ email: "" });
      })
      .catch((error) => {
        console.log(error.response);
        setShowAlert({
          isAlert: true,
          alertText: error.response.data["message"],
          severity: "error",
          alertTitle: "Error",
        });
        setIsForgotPassword(false);
        setIsRestPasswordSubmitting(false);
        setForgetPasswordState({ email: "" });
      });
  };

  return (
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

        <Box mb={3}>
          <Typography color="textPrimary" variant="h3">
            FORGOT PASSWORD?
          </Typography>
        </Box>

        <CustomInputTextField
          autoFocus
          margin="dense"
          id="name"
          attribute="Email ID (User ID)"
          is_required={true}
          type="email"
          fullWidth
          autoComplete="off"
          value={forgotPasswordState.email}
          onChange={(e) => setForgetPasswordState({ email: e.target.value })}
        />

        <Box my={2}>
          <Button
            onClick={handleForgotPassword}
            color="primary"
            disabled={isResetPasswordSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Reset Password
            {isResetPasswordSubmitting && (
              <CircularProgress size={24} className={classes.submitProgress} />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordView;
