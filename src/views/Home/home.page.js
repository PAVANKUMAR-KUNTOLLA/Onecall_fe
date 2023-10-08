import React, { useState, useEffect } from "react";
import Page from "../../components/Page";

import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.breakpoints.values.sm,
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
}));

const HomePage = () => {
  const customStyles = useStyles();
  const state = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <Page title="home">
      <h1>home, welcome to {state.taxYear}</h1>
    </Page>
  );
};

export default HomePage;
