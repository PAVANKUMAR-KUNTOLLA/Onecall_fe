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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
  statesNames,
  countryCode,
  residentialStatus,
  dependantRelationships,
} from "../../../constants";
import Api from "../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";
import CustomInputTextField from "../../../components/CustomInputField";
import DependantDetails from "./DependantDetails";
import SSN from "../../../components/ssn_field";

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

const FilerDetails = ({
  open,
  setValue,
  id,
  personalDetails,
  contactDetails,
  spouseDetails,
  incomeDetails,
  providedLivingSupport,
  handleFetchData,
  handleDownloadTemplate,
}) => {
  const customStyles = customTextStyles();
  const [isFilerDetailsLoading, setIsFilerDetailsLoading] = useState(false);
  const [isDependantDetailsLoading, setIsDependantDetailsLoading] =
    useState(false);
  const [dependantDetails, setDependantDetails] = useState([]);

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

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber === undefined || phoneNumber === null) {
      return "";
    }

    if (phoneNumber.includes("-")) {
      return phoneNumber;
    }

    // Remove non-numeric characters from the phone number
    const numericOnly = phoneNumber.replace(/\D/g, "");

    // Use regex to capture groups of digits in the desired format
    const formattedNumber = numericOnly.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "($1)-$2-$3"
    );

    return formattedNumber;
  };

  const [formData, setFormData] = useState({
    // Personal Details

    firstName: personalDetails["firstName"],
    middleName: personalDetails["middleName"],
    lastName: personalDetails["lastName"],
    ssn: personalDetails["ssn"],
    dateOfBirth: personalDetails["dateOfBirth"],
    gender: personalDetails["gender"],
    occupation: personalDetails["occupation"],
    residentialStatus: personalDetails["residentialStatus"],
    email: personalDetails["email"],

    // Contact Details
    street: contactDetails["street"],
    apartment: contactDetails["apartment"],
    city: contactDetails["city"],
    state: contactDetails["state"],
    zipCode: contactDetails["zipCode"],
    country: contactDetails["country"],
    primaryCountryCode: contactDetails["primaryCountryCode"],
    primaryPhoneNumber: contactDetails["primaryPhoneNumber"],
    secondaryCountryCode: contactDetails["secondaryCountryCode"],
    secondaryPhoneNumber: contactDetails["secondaryPhoneNumber"],
    contactEmail: contactDetails["contactEmail"],

    taxFiledLastYear: incomeDetails["taxFiledLastYear"], // Set an initial value for taxFiledLastYear

    // additional Spouse Details (Initially hidden)
    taxPayerStatus: personalDetails["taxPayerStatus"], // Default to "No" (Single)
    spouseFirstName: spouseDetails["spouseFirstName"],
    spouseMiddleInitial: spouseDetails["spouseMiddleInitial"],
    spouseLastName: spouseDetails["spouseLastName"],
    spouseSsnOrItin: spouseDetails["spouseSsnOrItin"],
    spouseApplyForItin: spouseDetails["spouseApplyForItin"], // Default to "No"
    spouseDateOfBirth: spouseDetails["spouseDateOfBirth"],
    spouseGender: spouseDetails["spouseGender"],
    spouseOccupation: spouseDetails["spouseOccupation"],
    spouseResidentialStatus: spouseDetails["spouseResidentialStatus"],
    spouseEmail: spouseDetails["spouseEmail"],
  });

  const stateOptions = statesNames;
  const countryCodes = countryCode;

  const handleDeleteDependant = (dependantId) => {
    setIsDependantDetailsLoading(true);
    let payload = { taxFilingId: id, id: dependantId };
    privateApiPOST(Api.deleteDependant, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setIsDependantDetailsLoading(false);
          handleFetchDependantDetails();
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsFilerDetailsLoading(false);
      });
  };

  const handleFetchDependantDetails = () => {
    setIsDependantDetailsLoading(true);
    let payload = { id: id };
    privateApiPOST(Api.dependantDetails, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setDependantDetails(data?.data);
          setIsDependantDetailsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsDependantDetailsLoading(false);
      });
  };

  useEffect(() => {
    if (open) {
      handleFetchDependantDetails();
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
        {isFilerDetailsLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Box>
              <Formik
                initialValues={formData}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string()
                    .max(255)
                    .required("First Name is required"),
                  middleName: Yup.string().max(255),
                  lastName: Yup.string()
                    .max(255)
                    .required("Last Name is required"),
                  ssn: Yup.string()
                    .matches(
                      /^\d{9}$/,
                      "SSN must be exactly 9 digits long and contain only numbers"
                    )
                    .required("SSN is required"),
                  dateOfBirth: Yup.date()
                    .max(new Date(), "Date of Birth cannot be in the future")
                    .required("Date of Birth is required"),
                  gender: Yup.string().required("Gender is required"),
                  occupation: Yup.string()
                    .max(255)
                    .required("Occupation is required"),
                  residentialStatus: Yup.string().required(
                    "Residential Status is required"
                  ),
                  street: Yup.string().max(255).required("Street is required"),
                  apartment: Yup.string().max(255),
                  city: Yup.string().max(255).required("City is required"),
                  state: Yup.string().max(255).required("State is required"),
                  zipCode: Yup.string()
                    .max(10)
                    .required("Zip Code is required"),
                  country: Yup.string()
                    .max(255)
                    .required("Country is required"),
                  primaryCountryCode: Yup.string().required(
                    " Country Code is required"
                  ),
                  primaryPhoneNumber: Yup.string().required(
                    "Primary Phone Number is required"
                  ),
                  secondaryCountryCode: Yup.string(),
                  secondaryPhoneNumber: Yup.string(),
                  contactEmail: Yup.string()
                    .email("Must be a valid email")
                    .max(255)
                    .required("Contact Email is required"),
                  taxFiledLastYear: Yup.boolean().required(
                    "Please select an option"
                  ),
                  taxPayerStatus: Yup.string().required(
                    "Please select your status"
                  ),

                  // additional Spouse Details (Add validation rules as needed)
                  spouseFirstName: Yup.string()
                    .when("taxPayerStatus", {
                      is: "MARRIED",
                      then: Yup.string().required(
                        "Spouse First Name is required"
                      ),
                      otherwise: Yup.string(),
                    })
                    .required("First name is required"),
                  spouseMiddleInitial: Yup.string(),
                  spouseLastName: Yup.string().required(
                    "Last name is required"
                  ),
                  spouseSsnOrItin: Yup.string(),
                  spouseApplyForItin: Yup.string(),
                  spouseDateOfBirth: Yup.string().required("DOB is required"),
                  spouseGender: Yup.string().required("Gender is required"),
                  spouseOccupation: Yup.string().required(
                    "Occupation is required"
                  ),
                  spouseResidentialStatus: Yup.string(),
                  spouseEmail: Yup.string().when("taxPayerStatus", {
                    is: "MARRIED",
                    then: Yup.string()
                      .email("Must be a valid email")
                      .max(255)
                      .required("Spouse Email is required"),
                    otherwise: Yup.string(),
                  }),

                  //  additional Details (Add validation rules as needed)
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setIsFilerDetailsLoading(true);
                  setSubmitting(true);
                  let payload = { ...values, id: id };
                  privateApiPOST(Api.personalContactDetails, payload)
                    .then((response) => {
                      const { status, data } = response;
                      if (status === 200) {
                        console.log("data", data);
                        setIsFilerDetailsLoading(false);
                        handleFetchData();
                        setSubmitting(false);
                      }
                    })
                    .catch((error) => {
                      console.log("Error", error);
                      setIsFilerDetailsLoading(false);
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
                    <Grid container spacing={2}>
                      {/* Left Side - Personal Details */}

                      <Grid item sm={6} xs={12}>
                        <Box className={customStyles.leftSide}>
                          <Typography
                            variant="h4"
                            sx={{ marginBottom: "36px" }}
                          >
                            Personal Details
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              maxWidth: "96%",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                              sx={{ marginTop: "20px", maxWidth: "25%" }}
                            >
                              Taxpayer Name
                              <font color="#11a63d" size="2">
                                (As Per SSN):
                              </font>
                            </Typography>

                            <Box>
                              <CustomInputTextField
                                attribute="First Name"
                                attributeTextAlign="right"
                                is_required={true}
                                error={Boolean(
                                  touched.firstName && errors.firstName
                                )}
                                fullWidth
                                helperText={
                                  touched.firstName && errors.firstName
                                }
                                // label={
                                //   <CustomLabel label="First Name" required={true} />
                                // }
                                margin="normal"
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                variant="outlined"
                              />

                              <CustomInputTextField
                                attribute="Middle Initial"
                                attributeTextAlign="right"
                                is_required={false}
                                error={Boolean(
                                  touched.middleName && errors.middleName
                                )}
                                fullWidth
                                helperText={
                                  touched.middleName && errors.middleName
                                }
                                // label={
                                //   <CustomLabel label="Middle Name" required={false} />
                                // }
                                margin="normal"
                                name="middleName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.middleName}
                                variant="outlined"
                              />
                              <CustomInputTextField
                                attribute="Last Name"
                                attributeTextAlign="right"
                                is_required={true}
                                error={Boolean(
                                  touched.lastName && errors.lastName
                                )}
                                fullWidth
                                helperText={touched.lastName && errors.lastName}
                                // label={
                                //   <CustomLabel label="Last Name" required={true} />
                                // }
                                margin="normal"
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                variant="outlined"
                              />
                            </Box>
                          </Box>

                          {/* <CustomInputTextField
                            attribute="SSN"
                            attributeTextAlign="right"
                            is_required={true}
                            error={Boolean(touched.ssn && errors.ssn)}
                            fullWidth
                            helperText={touched.ssn && errors.ssn}
                            // label={<CustomLabel label="SSN" required={true} />}
                            margin="normal"
                            name="ssn"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={transform(values.ssn)}
                            variant="outlined"
                          /> */}
                          <SSN
                            error={Boolean(touched.ssn && errors.ssn)}
                            fullWidth
                            // label={<CustomLabel label="SSN" required={true} />}
                            margin="normal"
                            name="ssn"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={transform(values.ssn)}
                            variant="outlined"
                          />

                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={10}>
                                <CustomInputTextField
                                  attribute="Date of Birth"
                                  attributeTextAlign="right"
                                  is_required={true}
                                  error={Boolean(
                                    touched.dateOfBirth && errors.dateOfBirth
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.dateOfBirth && errors.dateOfBirth
                                  }
                                  // label={
                                  //   <CustomLabel
                                  //     label="Date of Birth"
                                  //     required={true}
                                  //   />
                                  // }
                                  margin="normal"
                                  name="dateOfBirth"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.dateOfBirth}
                                  variant="outlined"
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
                            attributeTextAlign="right"
                            is_required={true}
                            error={Boolean(touched.gender && errors.gender)}
                            select
                            fullWidth
                            helperText={touched.gender && errors.gender}
                            // label={<CustomLabel label="Gender" required={true} />}
                            margin="normal"
                            name="gender"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.gender}
                            variant="outlined"
                          >
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </CustomInputTextField>
                          <CustomInputTextField
                            attribute="Occupation / Job Title"
                            attributeTextAlign="right"
                            is_required={true}
                            error={Boolean(
                              touched.occupation && errors.occupation
                            )}
                            fullWidth
                            helperText={touched.occupation && errors.occupation}
                            // label={
                            //   <CustomLabel label="Occupation" required={true} />
                            // }
                            margin="normal"
                            name="occupation"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.occupation}
                            variant="outlined"
                          />
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={10}>
                                <CustomInputTextField
                                  attribute="Residential Status"
                                  attributeTextAlign="right"
                                  is_required={true}
                                  error={Boolean(
                                    touched.residentialStatus &&
                                      errors.residentialStatus
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.residentialStatus &&
                                    errors.residentialStatus
                                  }
                                  // label={
                                  //   <CustomLabel
                                  //     label="Residential Status"
                                  //     required={true}
                                  //   />
                                  // }
                                  margin="normal"
                                  name="residentialStatus"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.residentialStatus}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2} sx={{ margin: "auto 0" }}>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    color: "#11a63d",
                                    whiteSpace: "nowrap",
                                    marginLeft: "-20px",
                                  }}
                                >
                                  [VISA TYPE]
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                      {/* Right Side - Contact Details */}
                      <Grid
                        item
                        sm={6}
                        xs={12}
                        // sx={{ marginLeft: { xs: "0px", sm: "60px" } }}
                      >
                        <Box className={customStyles.rightSide}>
                          <Typography
                            variant="h4"
                            sx={{ marginBottom: "16px" }}
                          >
                            Contact Details
                          </Typography>
                          <Typography
                            color={"#11a63d"}
                            sx={{ marginLeft: "10px" }}
                            variant="h5"
                          >
                            (Provide U.S current communication Address)
                          </Typography>
                          <CustomInputTextField
                            attribute="Street"
                            is_required={true}
                            error={Boolean(touched.street && errors.street)}
                            fullWidth
                            helperText={touched.street && errors.street}
                            // label={<CustomLabel label="Street" required={true} />}
                            margin="normal"
                            name="street"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.street}
                            variant="outlined"
                          />
                          <CustomInputTextField
                            attribute="Apartment"
                            is_required={true}
                            error={Boolean(
                              touched.apartment && errors.apartment
                            )}
                            fullWidth
                            helperText={touched.apartment && errors.apartment}
                            // label={
                            //   <CustomLabel label="Apartment" required={true} />
                            // }
                            margin="normal"
                            name="apartment"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.apartment}
                            variant="outlined"
                          />
                          <CustomInputTextField
                            attribute="City"
                            is_required={true}
                            error={Boolean(touched.city && errors.city)}
                            fullWidth
                            helperText={touched.city && errors.city}
                            // label={<CustomLabel label="City" required={true} />}
                            margin="normal"
                            name="city"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.city}
                            variant="outlined"
                          />
                          <CustomInputTextField
                            attribute="State"
                            is_required={true}
                            error={Boolean(touched.state && errors.state)}
                            select
                            fullWidth
                            helperText={touched.state && errors.state}
                            // label={<CustomLabel label="State" required={true} />}
                            margin="normal"
                            name="state"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.state}
                            variant="outlined"
                          >
                            {stateOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </CustomInputTextField>
                          <CustomInputTextField
                            attribute="Zip Code"
                            is_required={true}
                            error={Boolean(touched.zipCode && errors.zipCode)}
                            fullWidth
                            helperText={touched.zipCode && errors.zipCode}
                            // label={
                            //   <CustomLabel label="Zip Code" required={true} />
                            // }
                            margin="normal"
                            name="zipCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.zipCode}
                            variant="outlined"
                          />
                          <CustomInputTextField
                            attribute="Country"
                            is_required={true}
                            error={Boolean(touched.country && errors.country)}
                            select
                            fullWidth
                            helperText={touched.country && errors.country}
                            // label={
                            //   <CustomLabel label="Country" required={true} />
                            // }
                            margin="normal"
                            name="country"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.country}
                            variant="outlined"
                          >
                            {/* <MenuItem value="India">India</MenuItem> */}
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </CustomInputTextField>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "93%",
                              margin: "10px 0",
                              maxHeight: "60px",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                width: { xs: "30%", sm: "120px" },
                              }}
                            >
                              <span>Primary Phone</span>
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "0.875rem",
                                  marginLeft: "3px",
                                }}
                              >
                                *
                              </span>
                              &nbsp;:
                            </Typography>

                            <TextField
                              attribute="Primary Phone"
                              error={Boolean(
                                touched.primaryCountryCode &&
                                  errors.primaryCountryCode
                              )}
                              select
                              helperText={
                                touched.primaryCountryCode &&
                                errors.primaryCountryCode
                              }
                              // label={
                              //   <CustomLabel label="+91" required={true} />
                              // }
                              margin="normal"
                              name="primaryCountryCode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.primaryCountryCode}
                              variant="outlined"
                              sx={{
                                width: "18%",
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderRadius: "2px",
                                  },
                                },
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "0.1px solid #bdbdbd",
                                  },
                                "& .MuiOutlinedInput-input": {
                                  padding: "10px",
                                  backgroundColor: "rgba(255,255,255,1)",
                                },
                              }}
                            >
                              {countryCodes.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>

                            <TextField
                              error={Boolean(
                                touched.primaryPhoneNumber &&
                                  errors.primaryPhoneNumber
                              )}
                              helperText={
                                touched.primaryPhoneNumber &&
                                errors.primaryPhoneNumber
                              }
                              // label={
                              //   <CustomLabel
                              //     label="Primary Phone Number"
                              //     required={true}
                              //   />
                              // }
                              margin="normal"
                              name="primaryPhoneNumber"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={formatPhoneNumber(
                                values.primaryPhoneNumber
                              )}
                              variant="outlined"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderRadius: "2px",
                                  },
                                },
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "0.1px solid #bdbdbd",
                                  },
                                "& .MuiOutlinedInput-input": {
                                  padding: "10px",
                                  backgroundColor: "rgba(255,255,255,1)",
                                },
                                width: { xs: "50%", sm: "165px" },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "93%",
                              margin: "10px 0",
                              maxHeight: "60px",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                width: { xs: "30%", sm: "120px" },
                              }}
                            >
                              <span>Secondary Phone</span>
                              &nbsp;:
                            </Typography>

                            <TextField
                              error={Boolean(
                                touched.secondaryCountryCode &&
                                  errors.secondaryCountryCode
                              )}
                              select
                              helperText={
                                touched.secondaryCountryCode &&
                                errors.secondaryCountryCode
                              }
                              // label={
                              //   <CustomLabel
                              //     label="Country Code"
                              //     required={false}
                              //   />
                              // }
                              margin="normal"
                              name="secondaryCountryCode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.secondaryCountryCode}
                              variant="outlined"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderRadius: "2px",
                                  },
                                },
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "0.1px solid #bdbdbd",
                                  },
                                "& .MuiOutlinedInput-input": {
                                  padding: "10px",
                                  backgroundColor: "rgba(255,255,255,1)",
                                },
                                width: "18%",
                              }}
                            >
                              {countryCodes.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>

                            <TextField
                              attribute="Secondary Phone"
                              error={Boolean(
                                touched.secondaryPhoneNumber &&
                                  errors.secondaryPhoneNumber
                              )}
                              helperText={
                                touched.secondaryPhoneNumber &&
                                errors.secondaryPhoneNumber
                              }
                              // label={
                              //   <CustomLabel
                              //     label="Secondary Phone Number"
                              //     required={false}
                              //   />
                              // }
                              margin="normal"
                              name="secondaryPhoneNumber"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={formatPhoneNumber(
                                values.secondaryPhoneNumber
                              )}
                              variant="outlined"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderRadius: "2px",
                                  },
                                },
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "0.1px solid #bdbdbd",
                                  },
                                "& .MuiOutlinedInput-input": {
                                  padding: "10px",
                                  backgroundColor: "rgba(255,255,255,1)",
                                },
                                width: { xs: "50%", sm: "165px" },
                              }}
                            />
                          </Box>

                          <CustomInputTextField
                            attribute="Email Id"
                            is_required={false}
                            error={Boolean(
                              touched.contactEmail && errors.contactEmail
                            )}
                            fullWidth
                            helperText={
                              touched.contactEmail && errors.contactEmail
                            }
                            // label={
                            //   <CustomLabel
                            //     label="Contact Email"
                            //     required={true}
                            //   />
                            // }
                            margin="normal"
                            name="contactEmail"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.contactEmail}
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ margin: "16px 0" }}>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={10}
                            sm={5}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography variant="body1">
                              <CustomLabel
                                label="Have you filed your taxes with Onecall Tax Services in the last year?"
                                required={true}
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={2} sm={1}>
                            <select
                              id="taxFiledLastYear"
                              name="taxFiledLastYear"
                              value={values.taxFiledLastYear}
                              onChange={handleChange}
                              style={{ width: "100%" }}
                            >
                              <option value="">Select</option>
                              {/* Add an empty option */}
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ margin: "16px 0" }}>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={8}
                            sm={5}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="body1">
                              <CustomLabel
                                label="Taxpayer Status"
                                required={true}
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sm={1}>
                            <select
                              id="taxPayerStatus"
                              name="taxPayerStatus"
                              value={values.taxPayerStatus}
                              onChange={handleChange}
                              style={{ width: "100%" }}
                            >
                              <option value="">Select Status</option>{" "}
                              {/* Add an empty option */}
                              <option value="SINGLE">Single</option>
                              <option value="MARRIED">Married</option>
                            </select>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    {values.taxPayerStatus === "MARRIED" && (
                      <Grid container spacing={2}>
                        {/* Left Side - Spouse Details */}
                        <Grid item lg={6} sm={6} xs={12}>
                          <Typography variant="h4">Spouse Details</Typography>
                          <Grid container spacing={2}>
                            <CustomInputTextField
                              is_required={true}
                              attribute="First Name"
                              // label={
                              //   <CustomLabel
                              //     label="First Name"
                              //     required={true}
                              //   />
                              // }
                              margin="normal"
                              name="spouseFirstName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                              value={values.spouseFirstName}
                              variant="outlined"
                              error={Boolean(
                                touched.spouseFirstName &&
                                  errors.spouseFirstName
                              )}
                              helperText={
                                touched.spouseFirstName &&
                                errors.spouseFirstName
                              }
                            />

                            <CustomInputTextField
                              attribute="Middle Initial"
                              is_required={false}
                              // label={
                              //   <CustomLabel
                              //     label="Spouse Middle Initial"
                              //     required={true}
                              //   />
                              // }
                              margin="normal"
                              name="spouseMiddleInitial"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                              value={values.spouseMiddleInitial}
                              variant="outlined"
                            />

                            <CustomInputTextField
                              attribute="Last Name"
                              is_required={true}
                              // label={
                              //   <CustomLabel
                              //     label="Spouse Last Name"
                              //     required={true}
                              //   />
                              // }
                              margin="normal"
                              name="spouseLastName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                              value={values.spouseLastName}
                              variant="outlined"
                              error={Boolean(
                                touched.spouseLastName && errors.spouseLastName
                              )}
                              helperText={
                                touched.spouseLastName && errors.spouseLastName
                              }
                            />

                            <CustomInputTextField
                              attribute="SSN/ITIN"
                              is_required={false}
                              // label={
                              //   <CustomLabel
                              //     label="Spouse SSN/ITIN"
                              //     required={true}
                              //   />
                              // }
                              margin="normal"
                              name="spouseSsnOrItin"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                              value={transform(values.spouseSsnOrItin)}
                              variant="outlined"
                              error={Boolean(
                                touched.spouseSsnOrItin &&
                                  errors.spouseSsnOrItin
                              )}
                              helperText={
                                touched.spouseSsnOrItin &&
                                errors.spouseSsnOrItin
                              }
                            />

                            <CustomInputTextField
                              attribute="Do you want to apply for ITIN?"
                              is_required={false}
                              // label={
                              //   <CustomLabel
                              //     label="Do you want to apply for ITIN?"
                              //     required={true}
                              //   />
                              // }
                              select
                              margin="normal"
                              name="spouseApplyForItin"
                              onBlur={handleBlur}
                              fullWidth
                              onChange={handleChange}
                              value={values.spouseApplyForItin}
                              variant="outlined"
                              error={Boolean(
                                touched.spouseApplyForItin &&
                                  errors.spouseApplyForItin
                              )}
                              helperText={
                                touched.spouseApplyForItin &&
                                errors.spouseApplyForItin
                              }
                            >
                              <MenuItem value={false}>No</MenuItem>
                              <MenuItem value={true}>Yes</MenuItem>
                            </CustomInputTextField>
                            {values.spouseApplyForItin === true && (
                              <ButtonBase
                                onClick={() =>
                                  handleDownloadTemplate("ITIN_Information.xls")
                                }
                                sx={{
                                  marginTop: "12px",
                                  textDecoration: "underline",
                                }}
                                disableTouchRipple
                              >
                                Download ITIN Information Excel
                              </ButtonBase>
                            )}
                          </Grid>
                        </Grid>

                        {/* Right Side - Spouse Contact */}
                        <Grid item lg={6} sm={6} xs={12}>
                          <Typography variant="h4">Spouse Contact</Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={10}>
                                  <CustomInputTextField
                                    attribute="Date of Birth"
                                    is_required={true}
                                    // label={
                                    //   <CustomLabel
                                    //     label="Date of Birth"
                                    //     required={true}
                                    //   />
                                    // }
                                    margin="normal"
                                    name="spouseDateOfBirth"
                                    onBlur={handleBlur}
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.spouseDateOfBirth}
                                    variant="outlined"
                                    error={Boolean(
                                      touched.spouseDateOfBirth &&
                                        errors.spouseDateOfBirth
                                    )}
                                    helperText={
                                      touched.spouseDateOfBirth &&
                                      errors.spouseDateOfBirth
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
                              is_required={true}
                              // label={
                              //   <CustomLabel
                              //     label="Spouse Gender"
                              //     required={true}
                              //   />
                              // }
                              select
                              margin="normal"
                              name="spouseGender"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                              value={values.spouseGender}
                              variant="outlined"
                              error={Boolean(
                                touched.spouseGender && errors.spouseGender
                              )}
                              helperText={
                                touched.spouseGender && errors.spouseGender
                              }
                            >
                              <MenuItem value="MALE">Male</MenuItem>
                              <MenuItem value="FEMALE">Female</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                            </CustomInputTextField>

                            <CustomInputTextField
                              attribute="Occupation / Job Title"
                              is_required={true}
                              // label={
                              //   <CustomLabel
                              //     label="Spouse Occupation / Job Title"
                              //     required={true}
                              //   />
                              // }
                              margin="normal"
                              name="spouseOccupation"
                              onBlur={handleBlur}
                              fullWidth
                              onChange={handleChange}
                              value={values.spouseOccupation}
                              variant="outlined"
                              error={Boolean(
                                touched.spouseOccupation &&
                                  errors.spouseOccupation
                              )}
                              helperText={
                                touched.spouseOccupation &&
                                errors.spouseOccupation
                              }
                            />

                            <CustomInputTextField
                              attribute="Residential Status"
                              is_required={false}
                              // label={
                              //   <CustomLabel
                              //     label="Spouse Residential Status"
                              //     required={true}
                              //   />
                              // }
                              select
                              margin="normal"
                              name="spouseResidentialStatus"
                              onBlur={handleBlur}
                              fullWidth
                              onChange={handleChange}
                              value={values.spouseResidentialStatus}
                              variant="outlined"
                              error={Boolean(
                                touched.spouseResidentialStatus &&
                                  errors.spouseResidentialStatus
                              )}
                              helperText={
                                touched.spouseResidentialStatus &&
                                errors.spouseResidentialStatus
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
                              is_required={true}
                              // label={
                              //   <CustomLabel
                              //     label="Spouse Email Id"
                              //     required={true}
                              //   />
                              // }
                              margin="normal"
                              name="spouseEmail"
                              onBlur={handleBlur}
                              fullWidth
                              onChange={handleChange}
                              value={values.spouseEmail}
                              variant="outlined"
                              error={Boolean(
                                touched.spouseEmail && errors.spouseEmail
                              )}
                              helperText={
                                touched.spouseEmail && errors.spouseEmail
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: { xs: "8px 0", sm: "26px 0 20px" },
                          position: "absolute",
                          bottom: 0,
                          left: "40%",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ margin: "0 10px" }}
                        >
                          SAVE
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setValue(1)}
                          endIcon={<ArrowForwardIosIcon />}
                          color="primary"
                          sx={{
                            margin: "0 10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Next
                        </Button>
                      </Box>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Box>
            <DependantDetails
              open={open}
              id={id}
              providedLivingSupport={providedLivingSupport}
              dependantDetails={dependantDetails}
              handleFetchDependantDetails={handleFetchDependantDetails}
              handleDeleteDependant={handleDeleteDependant}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FilerDetails;
