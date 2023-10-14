import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import { Grid, Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import TabsDesktop from "../TaxFilling/TabsDesktop";
import BasicAccordion from "../TaxFilling/AccordionMobile";

import Api from "../../components/Api";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";

const TaxFillingPage = () => {
  const params = useParams();
  const [currTaxFiling, setCurrTaxFiling] = useState({});
  const [isCurrFilingLoading, setIsCurrFilingLoading] = useState(false);

  const handleFetchTaxFilingDetails = () => {
    setIsCurrFilingLoading(true);
    let payload = { id: params.id };
    privateApiPOST(Api.taxFiling, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setCurrTaxFiling(data?.data);
          setIsCurrFilingLoading(false);
          setCurrSelectedYear("");
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsCurrFilingLoading(false);
      });
  };

  useEffect(() => {
    handleFetchTaxFilingDetails();
  }, []);

  return (
    <Page title={"Tax Filling"}>
      <Container maxWidth="md">
        <Grid item xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
          <TabsDesktop data={currTaxFiling} />
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
          <BasicAccordion data={currTaxFiling} />
        </Grid>
      </Container>
    </Page>
  );
};

export default TaxFillingPage;
