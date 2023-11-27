import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import TextField from "@mui/material/TextField";
import Api from "../../../components/Api";
import { privateApiPOST } from "../../../components/PrivateRoute";
import CustomInputTextField from "../../../components/CustomInputField";

const customTextStyles = makeStyles((theme) => ({
  tableHeader: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "22px",
    [theme.breakpoints.down("sm")]: {
      // marginBottom: "8px",
      display: "none",
    },
  },
  tableData: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "23px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileViewTableCellValue: {
    color: "rgb(71, 71, 71)",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "19px",
  },
  mobileView: {
    borderRadius: "4px",
    boxShadow: "0px 0px 5px rgba(0,0,0, 0.1)",
    backgroundColor: "rgba(255,255,255, 1) !important",
    cursor: "pointer",
    border: "none !important",
    marginBottom: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  mobileViewTableCellHeader: {
    color: "rgb(245, 166, 35)",
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "14px",
  },
  buttons: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const OtherIncomeDetails = ({
  id,
  otherIncomeDetails,
  handleFetchData,
  handleDelete,
}) => {
  const customStyles = customTextStyles();
  const [isOtherIncomeDetailsLoading, setIsOtherIncomeDetailsLoading] =
    useState(false);

  const initialValues = {
    type: "otherIncome",
    incomeDescription: "",
    incomeAmount: "",
    addAdditionalInformation: false,
  };

  return (
    <Box sx={{ marginBottom: "100px" }}>
      {!isOtherIncomeDetailsLoading && (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
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
            setIsOtherIncomeDetailsLoading(true);
            setSubmitting(true);
            let payload = { ...values, id: id };
            privateApiPOST(Api.incomeDetails, payload)
              .then((response) => {
                const { status, data } = response;
                if (status === 200) {
                  console.log("data", data);
                  setIsOtherIncomeDetailsLoading(false);
                  handleFetchData();
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                console.log("Error", error);
                setIsOtherIncomeDetailsLoading(false);
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
              <Grid
                container
                spacing={2}
                sx={{
                  margin: "30px 0",
                }}
              >
                <Typography variant="h5">
                  Add other Income Information
                </Typography>

                <CustomInputTextField
                  error={Boolean(
                    touched.incomeDescription && errors.incomeDescription
                  )}
                  fullWidth
                  helperText={
                    touched.incomeDescription && errors.incomeDescription
                  }
                  attribute="Income Description"
                  margin="normal"
                  name="incomeDescription"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.incomeDescription}
                  variant="outlined"
                />

                <CustomInputTextField
                  error={Boolean(touched.incomeAmount && errors.incomeAmount)}
                  fullWidth
                  helperText={touched.incomeAmount && errors.incomeAmount}
                  attribute="Income Amount"
                  margin="normal"
                  name="incomeAmount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.incomeAmount}
                  variant="outlined"
                  type="number"
                />

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: { xs: "20px 0" },
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      name="addAdditionalInformation"
                    >
                      Add Additional Information
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <Box>
        {isOtherIncomeDetailsLoading ? (
          <CircularProgress />
        ) : (
          <TableContainer
            sx={{
              paddingBottom: { xs: "10px", sm: "0px" },
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginTop: "20px" }}
            >
              Other Income Details
            </Typography>
            <Table
              sx={{
                borderCollapse: "collapse",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell className={customStyles.tableHeader}>
                    Income Description
                  </TableCell>

                  <TableCell className={customStyles.tableHeader}>
                    Income Amount
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {otherIncomeDetails.length > 0 &&
                  otherIncomeDetails.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className={customStyles.tableData}>
                        {row.incomeDescription}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.incomeAmount}
                      </TableCell>

                      <TableCell className={customStyles.tableData}>
                        <Button
                          disabled={isOtherIncomeDetailsLoading}
                          startIcon={<DeleteIcon />}
                          size="small"
                          onClick={() => {
                            handleDelete(row.id);
                          }}
                          className={customStyles.buttons}
                        >
                          Delete{" "}
                          {isOtherIncomeDetailsLoading && (
                            <CircularProgress sx={{ ml: 1 }} size={14} />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {otherIncomeDetails.length === 0 && (
              <Typography
                variant="h5"
                sx={{ textAlign: "center", margin: "5px 0" }}
              >
                No Other Incomes Found
              </Typography>
            )}
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                color: "red",
                marginTop: "20px",
              }}
            >
              TO MODIFY Other Existing Income Details, DELETE THE SAME and then
              CLICK on "Add Other Additional Income Information"
            </Typography>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default OtherIncomeDetails;
