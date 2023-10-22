import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import {
  Grid,
  Container,
  Box,
  CircularProgress,
  Typography,
  Card,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import TabsDesktop from "../TaxFilling/TabsDesktop";
import BasicAccordion from "../TaxFilling/AccordionMobile";
import { makeStyles } from "@mui/styles";
import ConfirmDetails from "./confirmDetails";
import PickAppointment from "./pickAppointment";
import PayPalPayment from "../Home/payPalPayment";
import PerfectScrollbar from "react-perfect-scrollbar";

import Api from "../../components/Api";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import RefundQuote from "./refundQuote";

export const customTextStyles = makeStyles((theme) => ({
  tabButton: {
    display: "block",
    width: "100%",
    paddingLeft: "15px",
    textAlign: "left",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
  },
}));

const TaxFillingPage = () => {
  const params = useParams();
  const customStyles = customTextStyles();
  const [data, setData] = useState({});
  const [isLoadingSpin, setIsLoadingSpin] = useState(true);
  const [isActiveTab, setIsActiveTab] = useState("My Details");

  const handleActiveTabChange = (tabName) => {
    setIsActiveTab(tabName);
  };

  const handleFetchTaxFilingDetails = () => {
    setIsLoadingSpin(true);
    let payload = { id: params.id };
    privateApiPOST(Api.taxFiling, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setData(data?.data);
          setIsLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoadingSpin(false);
      });
  };

  const handleDownloadTemplate = (file) => {
    let payload = {
      file_name: file,
    };

    privateApiPOST(Api.templateDownload, payload, { responseType: "blob" })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const url = window.URL.createObjectURL(new Blob([data]));
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.setAttribute("download", file);
          document.body.appendChild(anchor);
          anchor.click();
        } else {
        }
      })
      .catch((err) => {
        console.log("handleDownloadFile--->", err);
      });
  };

  useEffect(() => {
    handleFetchTaxFilingDetails();
  }, []);

  return (
    <Page title={"Tax Filing"}>
      <Box>
        <Container maxWidth="lg">
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Grid container>
              <Grid item xs={2}>
                <Card
                  sx={{
                    minHeight: "280px",
                    borderRadius: "2px",
                  }}
                >
                  {[
                    "My Details",
                    "Confirm Details",
                    "Pick Appointment",
                    "Refund Quote",
                    "Pay Now",
                  ].map((each, index) => (
                    <Button
                      key={index}
                      onClick={() => handleActiveTabChange(each)}
                      variant={isActiveTab === each ? "contained" : "text"}
                      className={customStyles.tabButton}
                      sx={{
                        color: isActiveTab === each ? "#fff" : "#474747",
                      }}
                    >
                      {each}
                    </Button>
                  ))}
                </Card>
              </Grid>
              <Grid item xs={10}>
                {isLoadingSpin ? (
                  <Box
                    display="flex"
                    height="100%"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      position: "absolute",
                      zIndex: "10",
                      left: 0,
                      top: 0,
                    }}
                  >
                    <CircularProgress size={30} />
                  </Box>
                ) : data.personalDetails &&
                  data.bankDetails &&
                  data.incomeDetails ? (
                  <Box
                    sx={{
                      backgroundColor: "rgba(255,255,255,1)",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      borderRadius: "4px",
                      padding: "20px 10px",
                      height: "800px", // Adjust the height as needed
                      overflow: "auto", // Add overflow to enable scrolling
                      maxHeight: "800px", // Add a maximum height to prevent content from overflowing
                      marginLeft: "20px",
                    }}
                  >
                    <PerfectScrollbar>
                      <Typography
                        variant="h3"
                        sx={{
                          marginLeft: "20px",
                          marginBottom:
                            isActiveTab === "My Details" ? 0 : "30px",
                        }}
                      >
                        Tax-Filing For Year {params.year}
                      </Typography>
                      {isActiveTab === "My Details" && (
                        <TabsDesktop
                          data={data}
                          handleFetchData={handleFetchTaxFilingDetails}
                          handleDownloadTemplate={handleDownloadTemplate}
                        />
                      )}
                      {isActiveTab === "Confirm Details" && (
                        <ConfirmDetails
                          id={data["id"]}
                          personalDetails={data["personalDetails"]}
                          contactDetails={data["contactDetails"]}
                          spouseDetails={data["spouseDetails"]}
                          providedLivingSupport={data["providedLivingSupport"]}
                          incomeDetails={data["incomeDetails"]}
                          bankDetails={data["bankDetails"]}
                          handlePickAppointment={handleActiveTabChange}
                        />
                      )}
                      {isActiveTab === "Pick Appointment" && (
                        <PickAppointment id={data["id"]} />
                      )}
                      {isActiveTab === "Refund Quote" && <RefundQuote />}
                      {isActiveTab === "Pay Now" && <PayPalPayment />}
                    </PerfectScrollbar>
                  </Box>
                ) : null}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            {isLoadingSpin ? (
              <Box
                display="flex"
                height="100%"
                width="100%"
                justifyContent="center"
                alignItems="center"
                sx={{
                  position: "absolute",
                  zIndex: "10",
                  left: 0,
                  top: 0,
                }}
              >
                <CircularProgress size={30} />
              </Box>
            ) : data.personalDetails &&
              data.bankDetails &&
              data.incomeDetails ? (
              <BasicAccordion
                data={data}
                handleFetchData={handleFetchTaxFilingDetails}
                handleDownloadTemplate={handleDownloadTemplate}
              />
            ) : null}
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default TaxFillingPage;
