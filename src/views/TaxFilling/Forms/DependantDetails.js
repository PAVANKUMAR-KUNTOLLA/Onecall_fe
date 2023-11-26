import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  ButtonBase,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { residentialStatus, dependantRelationships } from "../../../constants";
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

export function CustomLabel({ label, required }) {
  return (
    <label style={{ display: "flex", alignItems: "center" }}>
      {label}
      {required && (
        <span
          style={{
            color: "red",
            fontSize: "16px",
            marginLeft: "3px",
          }}
        >
          *
        </span>
      )}
    </label>
  );
}

const DependantDetails = ({
  open,
  id,
  providedLivingSupport,
  dependantDetails,
  handleFetchDependantDetails,
  handleDeleteDependant,
}) => {
  const customStyles = customTextStyles();
  const [isDependantDetailsLoading, setIsDependantDetailsLoading] =
    useState(false);

  const transform = (input) => {
    if (input === undefined || input === null) {
      return "";
    }

    if (input.includes("-")) {
      return input;
    }

    const rawSsn = input.replace(/-/g, ""); // Remove hyphens
    const formattedSsn = rawSsn
      .replace(/\D/g, "") // Remove non-digits
      .replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3"); // Format as 123-45-6789
    return formattedSsn;
  };

  const [formData, setFormData] = useState({
    // Personal Details

    providedLivingSupport: providedLivingSupport,
    isNewDependant: false,
    additionalFirstName: "",
    additionalMiddleInitial: "",
    additionalLastName: "",
    additionalSsnOrItin: "",
    additionalApplyForItin: false, // Default to "No"
    additionalDateOfBirth: "",
    additionalGender: "",
    additionalOccupation: "",
    additionalVisaType: "",
    additionalEmail: "",
    additionalStayCount: "",
    additionalRelationship: "",
  });

  return (
    <Box sx={{ marginBottom: "100px" }}>
      {!isDependantDetailsLoading && (
        <Box>
          <Formik
            initialValues={formData}
            validationSchema={Yup.object().shape({
              //  additional Details (Add validation rules as needed)

              providedLivingSupport: Yup.boolean().required(
                "Please select an option"
              ),

              isNewDependant: Yup.boolean().required("Please select an option"),

              additionalFirstName: Yup.string(),
              additionalMiddleInitial: Yup.string(),
              additionalLastName: Yup.string(),
              additionalSsnOrItin: Yup.string(),
              additionalApplyForItin: Yup.string(),
              additionalDateOfBirth: Yup.date(),
              additionalGender: Yup.string(),
              additionalOccupation: Yup.string(),
              additionalVisaType: Yup.string(),
              additionalEmail: Yup.string()
                .email("Must be a valid email")
                .max(255),
              additionalRelationship: Yup.string(),
              additionalStayCount: Yup.number(),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setIsDependantDetailsLoading(true);
              setSubmitting(true);
              let payload = { ...values, id: id };
              privateApiPOST(Api.addDependant, payload)
                .then((response) => {
                  const { status, data } = response;
                  if (status === 200) {
                    console.log("data", data);
                    setIsDependantDetailsLoading(false);
                    handleFetchDependantDetails();
                    setSubmitting(false);
                    resetForm();
                  }
                })
                .catch((error) => {
                  console.log("Error", error);
                  setIsDependantDetailsLoading(false);
                  setSubmitting(false);
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
            }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container>
                  <Grid
                    container
                    sx={{
                      marginTop: "36px",
                      marginBottom: "24px",
                    }}
                  >
                    <Grid
                      item
                      xs={10}
                      sm={9}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body1">
                        <CustomLabel
                          label=" Have you (or your spouse, if married) provided living
                        support to your kids and/or dependents during the tax
                        year?"
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <CustomInputTextField
                        attribute=""
                        is_required={true}
                        // label={<CustomLabel label="" />}
                        select
                        margin="normal"
                        name="providedLivingSupport"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.providedLivingSupport}
                        variant="outlined"
                        error={Boolean(
                          touched.providedLivingSupport &&
                            errors.providedLivingSupport
                        )}
                        helperText={
                          touched.providedLivingSupport &&
                          errors.providedLivingSupport
                        }
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </CustomInputTextField>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography
                      variant="body1"
                      style={{ color: "blue", wordSpacing: "2px" }}
                    >
                      NOTE: Make sure the kids or dependents reported in your
                      (Taxpayer) 2023 Tax Return are not claimed as dependents
                      in any other 2023 Individual Tax Returns.
                    </Typography>
                  </Grid>

                  {values.providedLivingSupport === true ? (
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={
                            values.isNewDependant ? <RemoveIcon /> : <AddIcon />
                          }
                          onClick={() => {
                            // Toggle between true and false
                            setFieldValue(
                              "isNewDependant",
                              !values.isNewDependant
                            );
                          }}
                          sx={{
                            margin: "10px",
                          }}
                        >
                          {values.isNewDependant
                            ? "Remove Dependant"
                            : "Add Dependant"}
                        </Button>
                      </Box>
                    </Grid>
                  ) : null}

                  {values.isNewDependant && (
                    <Grid container spacing={2}>
                      {/* Left Side - additional Details */}
                      <Grid item lg={6} sm={6} xs={12}>
                        <Typography variant="h4">Additional Details</Typography>
                        <Grid container spacing={2}>
                          <CustomInputTextField
                            attribute="First Name"
                            // label={
                            //   <CustomLabel
                            //     label="First Name"
                            //     required={true}
                            //   />
                            // }
                            margin="normal"
                            name={`additionalFirstName`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            value={values.additionalFirstName}
                            variant="outlined"
                            error={
                              touched.additionalFirstName &&
                              errors.additionalFirstName
                            }
                            helperText={
                              touched.additionalFirstName &&
                              errors.additionalFirstName
                            }
                          />

                          <CustomInputTextField
                            attribute="Middle Initial"
                            // label={
                            //   <CustomLabel
                            //     label="Middle Initial"
                            //     required={false}
                            //   />
                            // }
                            margin="normal"
                            name={`additionalMiddleInitial`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            value={values.additionalMiddleInitial}
                            variant="outlined"
                          />

                          <CustomInputTextField
                            attribute="Last Name"
                            // label={
                            //   <CustomLabel
                            //     label="Last Name"
                            //     required={true}
                            //   />
                            // }
                            margin="normal"
                            name={`additionalLastName`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            value={values.additionalLastName}
                            variant="outlined"
                            error={
                              touched.additionalLastName &&
                              errors.additionalLastName
                            }
                            helperText={
                              touched.additionalLastName &&
                              errors.additionalLastName
                            }
                          />

                          <CustomInputTextField
                            attribute="SSN/ITIN"
                            // label={
                            //   <CustomLabel label="SSN/ITIN" required={true} />
                            // }
                            margin="normal"
                            name={`additionalSsnOrItin`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            value={transform(values.additionalSsnOrItin)}
                            variant="outlined"
                            error={
                              touched.additionalSsnOrItin &&
                              errors.additionalSsnOrItin
                            }
                            helperText={
                              touched.additionalSsnOrItin &&
                              errors.additionalSsnOrItin
                            }
                          />

                          <CustomInputTextField
                            attribute="Do you want to apply for ITIN?"
                            // label={
                            //   <CustomLabel
                            //     label="Do you want to apply for ITIN?"
                            //     required={true}
                            //   />
                            // }
                            select
                            margin="normal"
                            name={`additionalApplyForItin`}
                            onBlur={handleBlur}
                            fullWidth
                            onChange={handleChange}
                            value={values.additionalApplyForItin}
                            variant="outlined"
                            error={
                              touched.additionalApplyForItin &&
                              errors.additionalApplyForItin
                            }
                            helperText={
                              touched.additionalApplyForItin &&
                              errors.additionalApplyForItin
                            }
                          >
                            <MenuItem value={false}>No</MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                          </CustomInputTextField>
                          {values.additionalApplyForItin === true && (
                            <ButtonBase
                              onClick={() =>
                                handleDownloadTemplate("ITIN_Information.xls")
                              }
                              sx={{
                                marginTop: "20px",
                                textDecoration: "underline",
                              }}
                              disableTouchRipple
                            >
                              Download ITIN Information Excel
                            </ButtonBase>
                          )}

                          <CustomInputTextField
                            attribute="Relationship"
                            // label={
                            //   <CustomLabel
                            //     label="Relationship"
                            //     required={true}
                            //   />
                            // }
                            margin="normal"
                            name={`additionalRelationship`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            select
                            value={values.additionalRelationship}
                            variant="outlined"
                            error={
                              touched.additionalRelationship &&
                              errors.additionalRelationship
                            }
                            helperText={
                              touched.additionalRelationship &&
                              errors.additionalRelationship
                            }
                          >
                            {dependantRelationships.map((each, id) => (
                              <MenuItem value={each} key={id}>
                                {each}
                              </MenuItem>
                            ))}
                          </CustomInputTextField>
                        </Grid>
                      </Grid>

                      {/* Right Side - additional Contact */}
                      <Grid item lg={6} sm={6} xs={12}>
                        <Typography variant="h4">Additional Contact</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={10}>
                                <CustomInputTextField
                                  attribute="Dependent DOB"
                                  // label={
                                  //   <CustomLabel
                                  //     label="Date of Birth"
                                  //     required={true}
                                  //   />
                                  // }
                                  margin="normal"
                                  name={`additionalDateOfBirth`}
                                  onBlur={handleBlur}
                                  fullWidth
                                  onChange={handleChange}
                                  value={values.additionalDateOfBirth}
                                  variant="outlined"
                                  error={
                                    touched.additionalDateOfBirth &&
                                    errors.additionalDateOfBirth
                                  }
                                  helperText={
                                    touched.additionalDateOfBirth &&
                                    errors.additionalDateOfBirth
                                  }
                                  InputLabelProps={{
                                    shrink: true, // This is important for the label to behave correctly
                                  }}
                                  InputProps={{
                                    style: {
                                      color: "black", // Customize the label color
                                    },
                                  }}
                                  inputProps={{
                                    // To disable the default placeholder
                                    placeholder: "",
                                    // Other attributes you might need
                                  }}
                                />
                              </Grid>
                              <Grid item xs={2} sx={{ margin: "auto 0" }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "#11a63d",
                                    whiteSpace: "nowrap",
                                    marginLeft: "-20px",
                                  }}
                                >
                                  [MM/DD/YYYY]
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <CustomInputTextField
                            attribute="Gender"
                            // label={
                            //   <CustomLabel label="Gender" required={true} />
                            // }
                            select
                            margin="normal"
                            name={`additionalGender`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            value={values.additionalGender}
                            variant="outlined"
                            error={
                              touched.additionalGender &&
                              errors.additionalGender
                            }
                            helperText={
                              touched.additionalGender &&
                              errors.additionalGender
                            }
                          >
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </CustomInputTextField>

                          <CustomInputTextField
                            attribute="Occupation / Job Title"
                            // label={
                            //   <CustomLabel
                            //     label="Occupation / Job Title"
                            //     required={true}
                            //   />
                            // }
                            margin="normal"
                            name={`additionalOccupation`}
                            onBlur={handleBlur}
                            fullWidth
                            onChange={handleChange}
                            value={values.additionalOccupation}
                            variant="outlined"
                            error={
                              touched.additionalOccupation &&
                              errors.additionalOccupation
                            }
                            helperText={
                              touched.additionalOccupation &&
                              errors.additionalOccupation
                            }
                          />

                          <CustomInputTextField
                            attribute="Visa Type"
                            // label={
                            //   <CustomLabel
                            //     label="Visa Type"
                            //     required={true}
                            //   />
                            // }
                            margin="normal"
                            name={`additionalVisaType`}
                            onBlur={handleBlur}
                            select
                            fullWidth
                            onChange={handleChange}
                            value={values.additionalVisaType}
                            variant="outlined"
                            error={
                              touched.additionalVisaType &&
                              errors.additionalVisaType
                            }
                            helperText={
                              touched.additionalVisaType &&
                              errors.additionalVisaType
                            }
                          >
                            {residentialStatus.map((each, id) => (
                              <MenuItem value={each} key={id}>
                                {each}
                              </MenuItem>
                            ))}
                          </CustomInputTextField>

                          <CustomInputTextField
                            attribute="Email Id"
                            // label={
                            //   <CustomLabel label="Email Id" required={true} />
                            // }
                            margin="normal"
                            name={`additionalEmail`}
                            onBlur={handleBlur}
                            fullWidth
                            onChange={handleChange}
                            value={values.additionalEmail}
                            variant="outlined"
                            error={
                              touched.additionalEmail && errors.additionalEmail
                            }
                            helperText={
                              touched.additionalEmail && errors.additionalEmail
                            }
                          />
                          <CustomInputTextField
                            attribute="No. of months dependent has stayed with you in U.S"
                            // label={
                            //   <CustomLabel
                            //     label="No. of months dependent has stayed with you in U.S"
                            //     required={true}
                            //   />
                            // }
                            margin="normal"
                            name={`additionalStayCount`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            value={values.additionalStayCount}
                            variant="outlined"
                            error={
                              touched.additionalStayCount &&
                              errors.additionalStayCount
                            }
                            helperText={
                              touched.additionalStayCount &&
                              errors.additionalStayCount
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  {values.isNewDependant && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: { xs: "8px 0", sm: "60px 0 20px" },
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          sx={{ margin: "0 10px" }}
                        >
                          Save Dependents Details
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      )}
      <Grid item xs={12}>
        {isDependantDetailsLoading ? (
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
              Existing Dependents Details
            </Typography>
            <Table
              sx={{
                borderCollapse: "collapse",
              }}
              aria-label="Place Order Series Table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={customStyles.tableHeader}>
                    Name
                  </TableCell>

                  <TableCell className={customStyles.tableHeader}>
                    Relationship
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    SSN/ITIN
                  </TableCell>
                  <TableCell
                    className={customStyles.tableHeader}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Apply ?
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    DOB
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Visa Type
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    C.S
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Months
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dependantDetails.length > 0 &&
                  dependantDetails.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className={customStyles.tableData}>
                        {row.additionalFirstName} {row.additionalLastName}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.additionalRelationship}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {transform(row.additionalSsnOrItin)}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.additionalApplyForItin ? "YES" : "NO"}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.additionalDateOfBirth}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.additionalVisaType}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        USA
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.additionalStayCount}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        <Button
                          disabled={isDependantDetailsLoading}
                          startIcon={<DeleteIcon />}
                          size="small"
                          onClick={() => {
                            handleDeleteDependant(row.id);
                          }}
                          className={customStyles.buttons}
                        >
                          Delete{" "}
                          {isDependantDetailsLoading && (
                            <CircularProgress sx={{ ml: 1 }} size={14} />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className={customStyles.mobileView}>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              marginTop: "16px",
                            }}
                          >
                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewTableCellHeader
                                }
                              >
                                First Name
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewTableCellValue
                                }
                              >
                                {row.additionalFirstName}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewTableCellHeader
                                }
                              >
                                Last Name
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewTableCellValue
                                }
                              >
                                {row.additionalLastName}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewTableCellHeader
                                }
                              >
                                RelationShip
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewTableCellValue
                                }
                              >
                                {row.additionalRelationship}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              marginTop: "16px",
                            }}
                          >
                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewTableCellHeader
                                }
                              >
                                Visa Type
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewTableCellValue
                                }
                              >
                                {row.additionalVisaType}
                              </Typography>
                            </Box>

                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewTableCellHeader
                                }
                              >
                                SSN/ITIN
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewTableCellValue
                                }
                              >
                                {transform(row.additionalSsnOrItin)}
                              </Typography>
                            </Box>

                            <Button
                              disabled={isDependantDetailsLoading}
                              startIcon={<DeleteIcon />}
                              size="small"
                              onClick={() => {
                                handleDeleteDependant(row.id);
                              }}
                            >
                              Delete{" "}
                              {isDependantDetailsLoading && (
                                <CircularProgress sx={{ ml: 1 }} size={14} />
                              )}
                            </Button>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {dependantDetails.length === 0 && (
              <Typography
                variant="h5"
                sx={{ textAlign: "center", margin: "5px 0" }}
              >
                No Dependants Found
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
              TO MODIFY EXISTING DEPENDENT DETAILS, DELETE THE SAME and then
              CLICK on "Add Additional Dependents"
            </Typography>
          </TableContainer>
        )}
      </Grid>
    </Box>
  );
};

export default DependantDetails;
