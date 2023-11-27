import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Tooltip,
  ButtonBase,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import TextField from "@mui/material/TextField";
import Api from "../../../components/Api";
import { privateApiPOST } from "../../../components/PrivateRoute";
import CustomInputTextField from "../../../components/CustomInputField";
import OtherIncomeDetails from "./OtherIncomeDetails";

const IncomeDetails = ({
  open,
  setValue,
  id,
  data,
  handleFetchData,
  handleDownloadTemplate,
}) => {
  const [isIncomeDetailsLoading, setIsIncomeDetailsLoading] = useState(false);
  const [otherIncomeDetails, setotherIncomeDetails] = useState([]);

  const initialValues = {
    interestIncome: data["interestIncome"],
    dividendIncome: data["dividendIncome"],
    soldStocks: data["soldStocks"],
    soldCrypto: data["soldCrypto"],
    foreignIncome: data["foreignIncome"],
    retirementAccounts: data["retirementAccounts"],
    stateTaxRefund: data["stateTaxRefund"],
    foreignBankAccount: data["foreignBankAccount"],
    foreignAssets: data["foreignAssets"],
    rentalIncome: data["rentalIncome"],
    income1099: data["income1099"],
  };

  const handleDeleteOtherIncomeDetails = (otherIncomeId) => {
    setIsIncomeDetailsLoading(true);
    let payload = { id: id, otherIncomeId: otherIncomeId, type: "delete" };
    privateApiPOST(Api.otherIncomeDetails, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setIsIncomeDetailsLoading(false);
          setotherIncomeDetails(data?.data["otherIncomeDetails"]);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsIncomeDetailsLoading(false);
      });
  };

  const handleFetchOtherIncomeDetails = () => {
    setIsIncomeDetailsLoading(true);
    let payload = { id: id };
    privateApiPOST(Api.otherIncomeDetails, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setIsIncomeDetailsLoading(false);
          setotherIncomeDetails(data?.data["otherIncomeDetails"]);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsIncomeDetailsLoading(false);
      });
  };

  useEffect(() => {
    if (open) {
      handleFetchOtherIncomeDetails();
    }
  }, []);

  return (
    <Box
      sx={{
        padding: "20px 0 5px",
        border: { xs: "none", sm: "1px solid #3A97BB" },
        minHeight: { xs: "auto", sm: "800px" },
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {isIncomeDetailsLoading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              interestIncome: Yup.boolean(),
              dividendIncome: Yup.boolean(),
              soldStocks: Yup.boolean(),
              soldCrypto: Yup.boolean(),
              foreignIncome: Yup.boolean(),
              retirementAccounts: Yup.boolean(),
              stateTaxRefund: Yup.boolean(),
              foreignBankAccount: Yup.boolean(),
              foreignAssets: Yup.boolean(),
              rentalIncome: Yup.boolean(),
              income1099: Yup.boolean(),
              incomeDescription: Yup.string().when("addAdditionalInformation", {
                is: true,
                then: Yup.string().required("Income Description is Required"),
                otherwise: Yup.string(),
              }),
              incomeAmount: Yup.number().when("addAdditionalInformation", {
                is: true,
                then: Yup.number().required("Income Amount is Required"),
                otherwise: Yup.number(),
              }),
              addAdditionalInformation: Yup.boolean(),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setIsIncomeDetailsLoading(true);
              setSubmitting(true);
              let payload = { ...values, id: id };
              privateApiPOST(Api.incomeDetails, payload)
                .then((response) => {
                  const { status, data } = response;
                  if (status === 200) {
                    console.log("data", data);
                    setIsIncomeDetailsLoading(false);
                    handleFetchData();
                    setSubmitting(false);
                  }
                })
                .catch((error) => {
                  console.log("Error", error);
                  setIsIncomeDetailsLoading(false);
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
            }) => (
              <Form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Interest Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have any Interest Income?
                      </FormLabel>
                      <RadioGroup
                        name="interestIncome"
                        value={values.interestIncome}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Upload 1099-INT forms and Interest received in Foreign Banks"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Dividend Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have any Dividend Income?
                      </FormLabel>
                      <RadioGroup
                        name="dividendIncome"
                        value={values.dividendIncome}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Upload 1099-DIV forms and dividends received in Foreign Banks"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Sold Stocks */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Did you sell any stocks in 2023?
                      </FormLabel>
                      <RadioGroup
                        name="soldStocks"
                        value={values.soldStocks}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Upload 1099-B, Gain/Loss statement in excel format. If it is ESPP/RSU stocks, upload adjusted cost basis details as well."
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Sold Crypto */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Did you sell any Crypto Currency in 2023?
                      </FormLabel>
                      <RadioGroup
                        name="soldCrypto"
                        value={values.soldCrypto}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Download and fill Crypto CSV."
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                      {values.soldCrypto ? (
                        <ButtonBase
                          onClick={() =>
                            handleDownloadTemplate("Crypto_Information_1.xls")
                          }
                          sx={{
                            marginTop: "2px",
                            textDecoration: "underline",
                          }}
                          disableTouchRipple
                        >
                          Download and fill Crypto Excel
                        </ButtonBase>
                      ) : null}
                    </FormControl>
                  </Grid>
                  {/* Foreign Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have any foreign country income in 2023?
                      </FormLabel>
                      <RadioGroup
                        name="foreignIncome"
                        value={values.foreignIncome}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>

                      <Tooltip
                        title="Upload Total income received in Foreign Country and Total taxes paid in Foreign Country"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Contributions/Distributions */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have contributions/distributions to/from
                        retirement accounts in year 2023?
                      </FormLabel>
                      <RadioGroup
                        name="retirementAccounts"
                        value={values.retirementAccounts}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="401k/IRA etc., which is not mentioned in your W2. Upload Bank Statement 1099 R in Upload Tax Docs section"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* State Tax Refund */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Did you get State tax refund(s) in 2023?
                      </FormLabel>
                      <RadioGroup
                        name="stateTaxRefund"
                        value={values.stateTaxRefund}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="If yes, upload 1099 G you might have received from State in Upload Tax Docs section"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Foreign Bank Account */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have Account Balance in Foreign banks exceeding
                        more than $10,000?
                      </FormLabel>
                      <RadioGroup
                        name="foreignBankAccount"
                        value={values.foreignBankAccount}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="As per recent IRS laws, you need to report if the combined investments(stocks/bonds/real estate) of all your foreign accounts exceeds $10,000 on at least 1 day.
                        You do not need to pay any tax on this amount. A separate form need to be sent to IRS"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                      {values.foreignBankAccount ? (
                        <ButtonBase
                          onClick={() =>
                            handleDownloadTemplate("FBAR_Information_2023.xls")
                          }
                          sx={{
                            marginTop: "2px",
                            textDecoration: "underline",
                          }}
                          disableTouchRipple
                        >
                          Download and fill FBAR Excel
                        </ButtonBase>
                      ) : null}
                    </FormControl>
                  </Grid>

                  {/* Foreign Assets */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have Foreign Assets value more than $50,000 at
                        any time during the tax year?
                      </FormLabel>
                      <RadioGroup
                        name="foreignAssets"
                        value={values.foreignAssets}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="As per recent IRS laws, you need to report if the combined investments(stocks/bonds/Accounts/Partnerships) of all your foreign assets exceeds $50,000 on at least 1 day in year 2023. You do not need to pay any tax on this amount. You need to report these details to avoid penalties."
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                      {values.foreignAssets ? (
                        <ButtonBase
                          onClick={() =>
                            handleDownloadTemplate(
                              "FBAR_Information_2023_1.xls"
                            )
                          }
                          sx={{
                            marginTop: "2px",
                            textDecoration: "underline",
                          }}
                          disableTouchRipple
                        >
                          Download and fill FBAR Excel(Financial Assets Tab)
                        </ButtonBase>
                      ) : null}
                    </FormControl>
                  </Grid>

                  {/* Rental Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have Rental Income in Foreign Country/USA?
                      </FormLabel>
                      <RadioGroup
                        name="rentalIncome"
                        value={values.rentalIncome}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {/* 1099-Misc/1099-NEC Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have 1099-Misc/1099-NEC Income in year 2023?
                      </FormLabel>
                      <RadioGroup
                        name="income1099"
                        value={values.income1099}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Upload 1099 Misc / 1099 NEC"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: { xs: "8px 0", sm: "26px 0 20px" },
                        position: "absolute",
                        bottom: "6%",
                        left: "45%",
                      }}
                    >
                      <Button type="submit" variant="contained" color="primary">
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
        <OtherIncomeDetails
          id={id}
          otherIncomeDetails={otherIncomeDetails}
          handleFetchData={handleFetchOtherIncomeDetails}
          handleDelete={handleDeleteOtherIncomeDetails}
        />
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: { xs: "8px 0", sm: "26px 0 20px" },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setValue(0)}
              startIcon={<ArrowBackIosIcon />}
              color="primary"
              sx={{ margin: "0 10px", display: "flex", alignItems: "center" }}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              onClick={() => setValue(2)}
              endIcon={<ArrowForwardIosIcon />}
              color="primary"
              sx={{ margin: "0 10px", display: "flex", alignItems: "center" }}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default IncomeDetails;
