import React, { useState } from "react";
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
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import TextField from "@mui/material/TextField";

const validationSchema = Yup.object().shape({
  incomeDescription: Yup.string().required("Income Description is required"),
  incomeAmount: Yup.number().required("Income Amount is required"),
  // Add more validation rules as needed for other fields
});

const initialValues = {
  interestIncome: "no",
  dividendIncome: "no",
  soldStocks: "no",
  soldCrypto: "no",
  foreignIncome: "no",
  retirementAccounts: "no",
  stateTaxRefund: "no",
  foreignBankAccount: "no",
  foreignAssets: "no",
  rentalIncome: "no",
  income1099: "no",
  incomeDescription: "",
  incomeAmount: "",
};

const handleSubmit = (values) => {
  // Handle form submission here
  console.log(values);
};

const IncomeDetails = ({ id, data, handleFetchData }) => {
  const [additionalInfoArray, setAdditionalInfoArray] = useState([]);
  const [incomeDescription, setIncomeDescription] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  // Function to handle submission of additional information
  const handleAddAdditionalIncome = () => {
    if (incomeDescription && incomeAmount) {
      const newAdditionalInfo = {
        incomeDescription,
        incomeAmount,
      };

      setAdditionalInfoArray([...additionalInfoArray, newAdditionalInfo]);

      // Clear the form fields
      setIncomeDescription("");
      setIncomeAmount("");
    }
  };

  return (
    <Box>
      <Container>
        <Typography variant="h5">Other Income Details</Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                      Did you sell any stocks in 2022?
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                      Did you sell any Crypto Currency in 2022?
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                      Do you have any foreign country income in 2022?
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                      Do you have contributions/distributions to/from retirement
                      accounts in year 2022?
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                      Did you get State tax refund(s) in 2022?
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                      Do you have Foreign Assets value more than $50,000 at any
                      time during the tax year?
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
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
                      Do you have 1099-Misc/1099-NEC Income in year 2022?
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
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    marginLeft: "0px",
                  }}
                >
                  <Grid item sm={6} xs={12} className="leftSide">
                    <Typography variant="h5">
                      Add other Income Information
                    </Typography>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Income Description"
                        margin="normal"
                        fullWidth
                        value={incomeDescription}
                        onChange={(e) => setIncomeDescription(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Income Amount"
                        margin="normal"
                        fullWidth
                        value={incomeAmount}
                        onChange={(e) => setIncomeAmount(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddAdditionalIncome}
                      >
                        Add Additional Information
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  paddingBottom: { xs: "20px" },
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save & Proceed
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default IncomeDetails;
