import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import Api from "../../components/Api";
import { privateApiPOST } from "../../components/PrivateRoute";

const validationSchema = Yup.object().shape({
  bankingType: Yup.string().required("Banking Type is required"),
  bankName: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Bank Name is required"),
  }),
  accountHolderName: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Account Holder Name is required"),
  }),
  ownership: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Ownership is required"),
  }),
  routingNumber: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string()
      .matches(/^\d{9}$/, "Routing Number must be a valid 9-digit number")
      .required("Routing Number is required"),
  }),
  confirmRoutingNumber: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string()
      .required("Confirm Routing Number is required")
      .oneOf([Yup.ref("routingNumber"), null], "Routing Numbers must match"),
  }),
  accountNumber: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Account Number is required"),
  }),
  confirmAccountNumber: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string()
      .required("Confirm Account Number is required")
      .oneOf([Yup.ref("accountNumber"), null], "Account Numbers must match"),
  }),
  accountType: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Account Type is required"),
  }),
  confirmAccountType: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string()
      .required("Confirm Account Type is required")
      .oneOf([Yup.ref("accountType"), null], "Account Types must match"),
  }),
});

const BankDetails = ({ id, data, handleFetchData }) => {
  const [isBankDetailsLoading, setIsBankDetailsLoading] = useState(false);

  const initialValues = {
    bankingType: data["bankingType"],
    bankName: data["bankName"],
    accountHolderName: data["accountHolderName"],
    ownership: data["ownership"],
    routingNumber: data["routingNumber"],
    confirmRoutingNumber: data["confirmRoutingNumber"],
    accountNumber: data["accountNumber"],
    confirmAccountNumber: data["confirmAccountNumber"],
    accountType: data["accountType"],
    confirmAccountType: data["confirmAccountType"],
  };

  return (
    <Box>
      <Container>
        {isBankDetailsLoading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setIsBankDetailsLoading(true);
              setSubmitting(true);
              let payload = { ...values, id: id };
              privateApiPOST(Api.bankDetails, payload)
                .then((response) => {
                  const { status, data } = response;
                  if (status === 200) {
                    console.log("data", data);
                    setIsBankDetailsLoading(false);
                    handleFetchData();
                    setSubmitting(false);
                  }
                })
                .catch((error) => {
                  console.log("Error", error);
                  setIsBankDetailsLoading(false);
                  setSubmitting(false);
                });
            }}
          >
            {({ values, handleChange, errors, touched, handleBlur }) => (
              <Form>
                <Grid container spacing={2} sx={{ marginLeft: "0px" }}>
                  <Grid
                    container
                    sx={{ marginBottom: "30px", marginTop: "30px" }}
                  >
                    <Grid
                      item
                      xs={10}
                      sm={4}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body1">
                        I prefer to receive my tax refunds by way of
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={4}>
                      <select
                        id="bankingType"
                        name="bankingType"
                        value={values.bankingType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                      >
                        <option value="">Select Option</option>
                        <option value="DIRECT DEPOSIT INTO MY BANK ACCOUNT">
                          Direct deposit into my bank account
                        </option>
                        <option value="PAPER CHECK">Paper Check</option>
                      </select>
                      {touched.bankingType && errors.bankingType && (
                        <div className="error">{errors.bankingType}</div>
                      )}
                    </Grid>
                  </Grid>
                  <Grid>
                    {/* Additional Fields for Direct Deposit */}
                    <Typography
                      variant="h5"
                      sx={{ marginTop: "30px", marginLeft: "15px" }}
                    >
                      Direct Deposit Information
                    </Typography>
                    <Typography sx={{ marginTop: "30px", marginLeft: "15px" }}>
                      Note: Please understand that there is no risk by entering
                      Bank Account and Routing Numbers
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item lg={6} sm={6} xs={12}>
                        <TextField
                          label="Bank Name"
                          margin="normal"
                          name="bankName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.bankName}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(touched.bankName && errors.bankName)}
                          helperText={touched.bankName && errors.bankName}
                        />
                        <TextField
                          label="Account Number"
                          margin="normal"
                          name="accountNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.accountNumber}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(
                            touched.accountNumber && errors.accountNumber
                          )}
                          helperText={
                            touched.accountNumber && errors.accountNumber
                          }
                        />

                        <TextField
                          label="Routing Number"
                          margin="normal"
                          name="routingNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.routingNumber}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(
                            touched.routingNumber && errors.routingNumber
                          )}
                          helperText={
                            touched.routingNumber && errors.routingNumber
                          }
                        />
                        <TextField
                          label="Account Type"
                          margin="normal"
                          name="accountType"
                          select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.accountType}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(
                            touched.accountType && errors.accountType
                          )}
                          helperText={touched.accountType && errors.accountType}
                        >
                          <MenuItem value="SAVINGS">Savings</MenuItem>
                          <MenuItem value="CHECKING">Checking</MenuItem>
                        </TextField>
                        <TextField
                          label="Ownership"
                          margin="normal"
                          name="ownership"
                          select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.ownership}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(touched.ownership && errors.ownership)}
                          helperText={touched.ownership && errors.ownership}
                        >
                          <MenuItem value="TAXPAYER/SPOUSE">
                            Tax Payer / Spouse
                          </MenuItem>
                          <MenuItem value="JOINT">Joint</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item lg={6} sm={6} xs={12}>
                        <TextField
                          label="Account Holder Name"
                          margin="normal"
                          name="accountHolderName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.accountHolderName}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(
                            touched.accountHolderName &&
                              errors.accountHolderName
                          )}
                          helperText={
                            touched.accountHolderName &&
                            errors.accountHolderName
                          }
                        />

                        <TextField
                          label="Confirm Account Number"
                          margin="normal"
                          name="confirmAccountNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.confirmAccountNumber}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(
                            touched.confirmAccountNumber &&
                              errors.confirmAccountNumber
                          )}
                          helperText={
                            touched.confirmAccountNumber &&
                            errors.confirmAccountNumber
                          }
                        />
                        <TextField
                          label="Confirm Routing Number"
                          margin="normal"
                          name="confirmRoutingNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.confirmRoutingNumber}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(
                            touched.confirmRoutingNumber &&
                              errors.confirmRoutingNumber
                          )}
                          helperText={
                            touched.confirmRoutingNumber &&
                            errors.confirmRoutingNumber
                          }
                        />
                        <TextField
                          label="Confirm Account Type"
                          margin="normal"
                          name="confirmAccountType"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          select
                          fullWidth
                          value={values.confirmAccountType}
                          variant="outlined"
                          disabled={values.bankingType === "PAPER CHECK"}
                          error={Boolean(
                            touched.confirmAccountType &&
                              errors.confirmAccountType
                          )}
                          helperText={
                            touched.confirmAccountType &&
                            errors.confirmAccountType
                          }
                        >
                          <MenuItem value="SAVINGS">Savings</MenuItem>
                          <MenuItem value="CHECKING">Checking</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: { xs: "20px" },
                    marginTop: { xs: "20px" },
                  }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </Box>
  );
};

export default BankDetails;
