import React, { useEffect, useState } from "react";
import { Grid, Container, Box, CircularProgress } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

const SearchClientsPage = () => {
  const state = useSelector((state) => state.app);

  return <Box>Search Clients for more information</Box>;
};

export default SearchClientsPage;
