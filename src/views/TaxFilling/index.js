import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import { Grid, Container, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import TabsDesktop from "../TaxFilling/TabsDesktop";
import BasicAccordion from "../TaxFilling/AccordionMobile";

import Api from "../../components/Api";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";

const TaxFillingPage = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchTaxFilingDetails = () => {
    setIsLoading(true);
    let payload = { id: params.id };
    privateApiPOST(Api.taxFiling, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setData(data?.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchTaxFilingDetails();
  }, []);

  return (
    <Page title={"Tax Filling"}>
      <Container maxWidth="md">
        <Grid item xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
          {isLoading ? (
            <CircularProgress />
          ) : data.personalDetails && data.bankDetails && data.incomeDetails ? (
            <TabsDesktop
              data={data}
              handleFetchData={handleFetchTaxFilingDetails}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
          {isLoading ? (
            <CircularProgress />
          ) : data.personalDetails && data.bankDetails && data.incomeDetails ? (
            <BasicAccordion
              data={data}
              handleFetchData={handleFetchTaxFilingDetails}
            />
          ) : null}
        </Grid>
      </Container>
    </Page>
  );
};

export default TaxFillingPage;
