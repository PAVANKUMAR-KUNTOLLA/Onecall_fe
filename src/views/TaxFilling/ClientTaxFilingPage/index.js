import React, { useEffect, useState } from "react";
import Page from "../../../components/Page";
import {
  Grid,
  Container,
  Box,
  CircularProgress,
  Typography,
  Card,
  Button,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import TabsDesktop from "../TabsDesktop";
import BasicAccordion from "../AccordionMobile";
import { makeStyles } from "@mui/styles";
import ConfirmDetails from "../Forms/ConfirmDetails";
import PickAppointment from "../Forms/PickAppointment";
import PayPalPayment from "../../Home/payPalPayment";
import PerfectScrollbar from "react-perfect-scrollbar";

import Api from "../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";
import RefundQuote from "../Forms/RefundQuote";

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

const ClientTaxFillingPage = () => {
  const params = useParams();
  const customStyles = customTextStyles();
  const [data, setData] = useState({});
  const [isLoadingSpin, setIsLoadingSpin] = useState(true);
  const [isActiveTab, setIsActiveTab] =
    parseInt(params.action) === 7
      ? useState("Pay Now")
      : useState("My Details");

  const handleActiveTabChange = (tabName) => {
    setIsActiveTab(tabName);
  };

  const [tabsDesktopValue, setTabsDesktopValue] = useState(
    parseInt(params.action)
  );

  const handleTabsDesktopChange = (event, newValue) => {
    setTabsDesktopValue(newValue);
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
                    minHeight: "240px",
                    borderRadius: "2px",
                  }}
                >
                  {[
                    "My Details",
                    "Confirm Details",
                    "Pick Appointment",
                    "Refund Quote",
                    "Pay Now",
                  ].map((each, index) =>
                    each === "Pay Now" ? (
                      // Conditional rendering for "Pay Now" button
                      <Button
                        key={index}
                        onClick={() => handleActiveTabChange(each)}
                      >
                        <img
                          src="/static/img/pay_now.jpg"
                          alt="Pay Now"
                          style={{
                            minWidth: "100px",
                            width: "190px",
                            height: "50px",
                          }}
                        />
                      </Button>
                    ) : (
                      // Conditional rendering for other tabs
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
                    )
                  )}
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
                      top: "30%",
                    }}
                  >
                    <CircularProgress size={30} />
                  </Box>
                ) : data ? (
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
                        Tax-Filing For Year - {params.year}
                      </Typography>

                      {isActiveTab === "My Details" && (
                        <Box>
                          <Typography
                            color={"primary"}
                            sx={{
                              marginTop: "10px",
                              marginLeft: "auto",
                              marginRight: "auto",
                              textAlign: "center",
                            }}
                          >
                            NOTE : ON FILING ALL INFORMATION PLEASE MENTION YOUR
                            AVAILABILITY IN Pick an Appointment PAGE
                          </Typography>
                          <Typography
                            color={"#11a63d"}
                            sx={{
                              marginLeft: "24px",
                              wordSpacing: "3px",
                              marginTop: "4px",
                            }}
                          >
                            Taxpayer and spouse's SSN and Date of Birth fields
                            are set to default values. Please don't change them.
                            We will collect these details via phone call at the
                            time of tax filing
                          </Typography>

                          <TabsDesktop
                            value={tabsDesktopValue}
                            setValue={setTabsDesktopValue}
                            handleChange={handleTabsDesktopChange}
                            handleActiveTabChange={handleActiveTabChange}
                            data={data}
                            handleFetchData={handleFetchTaxFilingDetails}
                            handleDownloadTemplate={handleDownloadTemplate}
                          />
                        </Box>
                      )}
                      {isActiveTab === "Confirm Details" && (
                        <ConfirmDetails
                          open={isActiveTab === "Confirm Details"}
                          id={data["id"]}
                          personalDetails={data["personalDetails"]}
                          contactDetails={data["contactDetails"]}
                          spouseDetails={data["spouseDetails"]}
                          providedLivingSupport={data["providedLivingSupport"]}
                          incomeDetails={data["incomeDetails"]}
                          bankDetails={data["bankDetails"]}
                          handlePickAppointment={handleActiveTabChange}
                          dependantDetails={data["dependantDetails"]}
                        />
                      )}
                      {isActiveTab === "Pick Appointment" && (
                        <PickAppointment
                          open={isActiveTab === "Pick Appointment"}
                          id={data["id"]}
                        />
                      )}
                      {isActiveTab === "Refund Quote" && (
                        <RefundQuote open={isActiveTab === "Refund Quote"} />
                      )}
                      {isActiveTab === "Pay Now" && (
                        <PayPalPayment open={isActiveTab === "Pay Now"} />
                      )}
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
                  top: "70%",
                }}
              >
                <CircularProgress size={30} />
              </Box>
            ) : data ? (
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

export default ClientTaxFillingPage;
