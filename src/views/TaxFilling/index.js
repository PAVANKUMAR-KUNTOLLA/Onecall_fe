import React from "react";
import Page from "../../components/Page";
import { Grid, Container, Box } from "@mui/material";

import TabsDesktop from "../TaxFilling/TabsDesktop";
import BasicAccordion from "../TaxFilling/AccordionMobile";

const TaxFillingPage = () => {
  return (
    <Page title={"Tax Filling"}>
      <Container maxWidth="md">
        <Grid item xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
          <TabsDesktop />
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
          <BasicAccordion />
        </Grid>
      </Container>
    </Page>
  );
};

export default TaxFillingPage;
