import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import { Grid, Container, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

import TabsDesktop from "./tabsDesktop";
import BasicAccordion from "./accordinMobile";

import Api from "../../components/Api";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";

const ReferPage = () => {
  return (
    <Page title={"Refer"}>
      <Container maxWidth="md">
        <Grid item xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
          {/* {isLoading ? (
            <CircularProgress />
          ) : data.personalDetails && data.bankDetails && data.incomeDetails ? ( */}
          <TabsDesktop
          // data={data}
          // handleFetchData={handleFetchTaxFilingDetails}
          />
          {/* ) : null} */}
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
          {/* {isLoading ? (
            <CircularProgress />
          ) : data.personalDetails && data.bankDetails && data.incomeDetails ? ( */}
          <BasicAccordion
          // data={data}
          // handleFetchData={handleFetchTaxFilingDetails}
          />
          {/* ) : null} */}
        </Grid>
      </Container>
    </Page>
  );
};

export default ReferPage;
