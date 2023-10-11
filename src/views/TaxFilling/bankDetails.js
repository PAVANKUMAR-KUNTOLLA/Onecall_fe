import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup"; // Import Yup for validation

const initialValues = {
  bankingType: "",
  bankName: "",
  accountHolderName: "",
  ownership: "",
  routingNumber: "",
  confirmRoutingNumber: "",
  accountNumber: "",
  confirmAccountNumber: "",
  accountType: "",
  confirmAccountType: "",
};

const validationSchema = Yup.object().shape({
  bankingType: Yup.string().required("Banking Type is required"),
  bankName: Yup.string().required("Bank Name is required"),
  accountHolderName: Yup.string().required("Account Holder Name is required"),
  ownership: Yup.string().required("Ownership is required"),
  routingNumber: Yup.string().required("Routing Number is required"),
  confirmRoutingNumber: Yup.string()
    .required("Confirm Routing Number is required")
    .oneOf([Yup.ref("routingNumber"), null], "Routing Numbers must match"),
  accountNumber: Yup.string().required("Account Number is required"),
  confirmAccountNumber: Yup.string()
    .required("Confirm Account Number is required")
    .oneOf([Yup.ref("accountNumber"), null], "Account Numbers must match"),
  accountType: Yup.string().required("Account Type is required"),
  confirmAccountType: Yup.string()
    .required("Confirm Account Type is required")
    .oneOf([Yup.ref("accountType"), null], "Account Types must match"),
});

const handleSubmit = (values) => {
  // Handle form submission here
  console.log(values);
};

const BankDetails = () => {
  return (
    <Box>
      <Container>
        <Typography variant="h4">Bank Details :</Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, errors, touched, handleBlur }) => (
            <Form>
              <Grid container spacing={2} sx={{ marginLeft: "0px" }}>
                <Typography variant="h4" sx={{ marginTop: "30px" }}>
                  Important Note
                </Typography>
                <Typography
                  sx={{
                    marginTop: "30px",
                    wordSpacing: "2px",
                  }}
                >
                  The IRS and certain State Revenue Departments facilitate
                  DIRECT DEPOSIT / WITHDRAWAL of Tax Refund or Tax Dues on the
                  Tax Returns. If you are interested in availing this option, we
                  request you to kindly input the following details.
                </Typography>

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
                      <option value="0">
                        Direct deposit into my bank account
                      </option>
                      <option value="1">Paper check</option>
                    </select>
                    {touched.bankingType && errors.bankingType && (
                      <div className="error">{errors.bankingType}</div>
                    )}
                  </Grid>
                </Grid>

                {values.bankingType === "0" && (
                  <>
                    {/* Additional Fields for Direct Deposit */}
                    <Typography
                      variant="h5"
                      sx={{ marginTop: "30px", marginLeft: "15px" }}
                    >
                      Direct Deposit Information
                    </Typography>
                    <Typography sx={{ marginTop: "30px", marginLeft: "15px" }}>
                      Note : Please understand that there is no risk by entering
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
                          error={Boolean(touched.bankName && errors.bankName)}
                          helperText={touched.bankName && errors.bankName}
                        />
                        <TextField
                          label="Account Holder Name"
                          margin="normal"
                          name="accountHolderName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.accountHolderName}
                          variant="outlined"
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
                          label="Ownership"
                          margin="normal"
                          name="ownership"
                          select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.ownership}
                          variant="outlined"
                          error={Boolean(touched.ownership && errors.ownership)}
                          helperText={touched.ownership && errors.ownership}
                        >
                          <MenuItem value="0">Tax Payer / Spouse</MenuItem>
                          <MenuItem value="1">Joint</MenuItem>
                        </TextField>

                        <TextField
                          label="Routing Number"
                          margin="normal"
                          name="routingNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.routingNumber}
                          variant="outlined"
                          error={Boolean(
                            touched.routingNumber && errors.routingNumber
                          )}
                          helperText={
                            touched.routingNumber && errors.routingNumber
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
                          error={Boolean(
                            touched.confirmRoutingNumber &&
                              errors.confirmRoutingNumber
                          )}
                          helperText={
                            touched.confirmRoutingNumber &&
                            errors.confirmRoutingNumber
                          }
                        />
                      </Grid>
                      <Grid item lg={6} sm={6} xs={12}>
                        <TextField
                          label="Account Number"
                          margin="normal"
                          name="accountNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.accountNumber}
                          variant="outlined"
                          error={Boolean(
                            touched.accountNumber && errors.accountNumber
                          )}
                          helperText={
                            touched.accountNumber && errors.accountNumber
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
                          label="Account Type"
                          margin="normal"
                          name="accountType"
                          select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          value={values.accountType}
                          variant="outlined"
                          error={Boolean(
                            touched.accountType && errors.accountType
                          )}
                          helperText={touched.accountType && errors.accountType}
                        >
                          <MenuItem value="0">Savings</MenuItem>
                          <MenuItem value="1">Checking</MenuItem>
                        </TextField>
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
                          error={Boolean(
                            touched.confirmAccountType &&
                              errors.confirmAccountType
                          )}
                          helperText={
                            touched.confirmAccountType &&
                            errors.confirmAccountType
                          }
                        >
                          <MenuItem value="0">Savings</MenuItem>
                          <MenuItem value="1">Checking</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
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

export default BankDetails;
