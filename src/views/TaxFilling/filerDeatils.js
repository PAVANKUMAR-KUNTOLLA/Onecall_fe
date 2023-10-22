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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { statesNames, countryCode } from "../../constants";
import Api from "../../components/Api";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";

const customTextStyles = makeStyles((theme) => ({
  tableHeader: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "23px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tableData: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "22px",
    [theme.breakpoints.down("sm")]: {
      // marginBottom: "8px",
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

const FilerDetails = ({
  id,
  personalDetails,
  contactDetails,
  spouseDetails,
  incomeDetails,
  providedLivingSupport,
  handleFetchData,
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
      .replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3"); // Format as 123-45-6789
    return formattedSsn;
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
          handleFetchDependantDetails;
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
    handleFetchDependantDetails();
  }, []);

  return (
    <Box>
      <Container>
        {isFilerDetailsLoading ? (
          <CircularProgress />
        ) : (
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
                zipCode: Yup.string().max(10).required("Zip Code is required"),
                country: Yup.string().max(255).required("Country is required"),
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
                spouseFirstName: Yup.string().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.string().required("Spouse First Name is required"),
                  otherwise: Yup.string(),
                }),
                spouseMiddleInitial: Yup.string(),
                spouseLastName: Yup.string().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.string().required("Spouse Last Name is required"),
                  otherwise: Yup.string(),
                }),
                spouseSsnOrItin: Yup.string().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.string()
                    .required("Spouse SSN/ITIN is required if married")
                    .matches(/^\d{9}$/, "Spouse SSN/ITIN must be 9 digits"),
                  otherwise: Yup.string(),
                }),
                spouseApplyForItin: Yup.string().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.string().required(
                    "Please select whether you want to apply for ITIN"
                  ),
                  otherwise: Yup.string(),
                }),
                spouseDateOfBirth: Yup.date().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.date().required("Spouse Date of Birth is required"),
                  otherwise: Yup.date(),
                }),
                spouseGender: Yup.string().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.string().required("Spouse Gender is required"),
                  otherwise: Yup.string(),
                }),
                spouseOccupation: Yup.string().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.string().required("Spouse Occupation is required"),
                  otherwise: Yup.string(),
                }),
                spouseResidentialStatus: Yup.string().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.string().required(
                    "Spouse Residential Status is required"
                  ),
                  otherwise: Yup.string(),
                }),
                spouseEmail: Yup.string().when("taxPayerStatus", {
                  is: "MARRIED",
                  then: Yup.string()
                    .email("Must be a valid email")
                    .max(255)
                    .required("Spouse Email is required"),
                  otherwise: Yup.string(),
                }),

                //  additional Details (Add validation rules as needed)

                providedLivingSupport: Yup.boolean().required(
                  "Please select an option"
                ),

                isNewDependant: Yup.boolean().required(
                  "Please select an option"
                ),

                additionalFirstName: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string().required(
                    "additional First Name is required"
                  ),
                  otherwise: Yup.string(),
                }),
                additionalMiddleInitial: Yup.string(),
                additionalLastName: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string().required(
                    "additional Last Name is required"
                  ),
                  otherwise: Yup.string(),
                }),
                additionalSsnOrItin: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string().required(
                    "additional SSN/ITIN is required if married"
                  ),
                  otherwise: Yup.string(),
                }),
                additionalApplyForItin: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string().required(
                    "Please select whether you want to apply for ITIN"
                  ),
                  otherwise: Yup.string(),
                }),
                additionalDateOfBirth: Yup.date().when("isNewDependant", {
                  is: true,
                  then: Yup.date().required(
                    "additional Date of Birth is required"
                  ),
                  otherwise: Yup.date(),
                }),
                additionalGender: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string().required("additional Gender is required"),
                  otherwise: Yup.string(),
                }),
                additionalOccupation: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string().required(
                    "additional Occupation is required"
                  ),
                  otherwise: Yup.string(),
                }),
                additionalVisaType: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string().required(
                    "additional Residential Status is required"
                  ),
                  otherwise: Yup.string(),
                }),
                additionalEmail: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string()
                    .email("Must be a valid email")
                    .max(255)
                    .required("additional Email is required"),
                  otherwise: Yup.string(),
                }),
                additionalRelationship: Yup.string().when("isNewDependant", {
                  is: true,
                  then: Yup.string().required(
                    "additional Relationship is required"
                  ),
                  otherwise: Yup.string(),
                }),
                additionalStayCount: Yup.number().when("isNewDependant", {
                  is: true,
                  then: Yup.number().required(
                    "No. of months dependent has stayed with you in U.S is required"
                  ),
                  otherwise: Yup.number(),
                }),
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
                    <Grid item lg={6} sm={6} xs={12}>
                      <Box className={customStyles.leftSide}>
                        <Typography variant="h5">Personal Details</Typography>
                        <TextField
                          error={Boolean(touched.firstName && errors.firstName)}
                          fullWidth
                          helperText={touched.firstName && errors.firstName}
                          label="First Name"
                          margin="normal"
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(
                            touched.middleName && errors.middleName
                          )}
                          fullWidth
                          helperText={touched.middleName && errors.middleName}
                          label="Middle Name"
                          margin="normal"
                          name="middleName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.middleName}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.lastName && errors.lastName)}
                          fullWidth
                          helperText={touched.lastName && errors.lastName}
                          label="Last Name"
                          margin="normal"
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.ssn && errors.ssn)}
                          fullWidth
                          helperText={touched.ssn && errors.ssn}
                          label="SSN"
                          margin="normal"
                          name="ssn"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={transform(values.ssn)}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(
                            touched.dateOfBirth && errors.dateOfBirth
                          )}
                          fullWidth
                          helperText={touched.dateOfBirth && errors.dateOfBirth}
                          label=""
                          margin="normal"
                          name="dateOfBirth"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="date"
                          value={values.dateOfBirth}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.gender && errors.gender)}
                          select
                          fullWidth
                          helperText={touched.gender && errors.gender}
                          label="Gender"
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
                        </TextField>
                        <TextField
                          error={Boolean(
                            touched.occupation && errors.occupation
                          )}
                          fullWidth
                          helperText={touched.occupation && errors.occupation}
                          label="Occupation"
                          margin="normal"
                          name="occupation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.occupation}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(
                            touched.residentialStatus &&
                              errors.residentialStatus
                          )}
                          select
                          fullWidth
                          helperText={
                            touched.residentialStatus &&
                            errors.residentialStatus
                          }
                          label="Residential Status"
                          margin="normal"
                          name="residentialStatus"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.residentialStatus}
                          variant="outlined"
                        >
                          {[
                            "H4",
                            "US Citizen",
                            "L2",
                            "Green Card",
                            "Other",
                          ].map((each, id) => {
                            return (
                              <MenuItem key={id} value={each}>
                                {each}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      </Box>
                    </Grid>

                    {/* Right Side - Contact Details */}
                    <Grid item lg={6} sm={6} xs={12}>
                      <Box className={customStyles.rightSide}>
                        <Typography variant="h5">Contact Details</Typography>
                        <TextField
                          error={Boolean(touched.street && errors.street)}
                          fullWidth
                          helperText={touched.street && errors.street}
                          label="Street"
                          margin="normal"
                          name="street"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.street}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.apartment && errors.apartment)}
                          fullWidth
                          helperText={touched.apartment && errors.apartment}
                          label="Apartment"
                          margin="normal"
                          name="apartment"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.apartment}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.city && errors.city)}
                          fullWidth
                          helperText={touched.city && errors.city}
                          label="City"
                          margin="normal"
                          name="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.city}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.state && errors.state)}
                          select
                          fullWidth
                          helperText={touched.state && errors.state}
                          label="State"
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
                        </TextField>
                        <TextField
                          error={Boolean(touched.zipCode && errors.zipCode)}
                          fullWidth
                          helperText={touched.zipCode && errors.zipCode}
                          label="Zip Code"
                          margin="normal"
                          name="zipCode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.zipCode}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.country && errors.country)}
                          select
                          fullWidth
                          helperText={touched.country && errors.country}
                          label="Country"
                          margin="normal"
                          name="country"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.country}
                          variant="outlined"
                        >
                          <MenuItem value="India">India</MenuItem>
                          <MenuItem value="USA">USA</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                        <Grid container spacing={2}>
                          <Grid item sm={3} xs={4}>
                            <TextField
                              error={Boolean(
                                touched.primaryCountryCode &&
                                  errors.primaryCountryCode
                              )}
                              select
                              fullWidth
                              helperText={
                                touched.primaryCountryCode &&
                                errors.primaryCountryCode
                              }
                              label="country code"
                              margin="normal"
                              name="primaryCountryCode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.primaryCountryCode}
                              variant="outlined"
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
                          </Grid>
                          <Grid item sm={9} xs={8}>
                            <TextField
                              error={Boolean(
                                touched.primaryPhoneNumber &&
                                  errors.primaryPhoneNumber
                              )}
                              fullWidth
                              helperText={
                                touched.primaryPhoneNumber &&
                                errors.primaryPhoneNumber
                              }
                              label="Primary Phone Number"
                              margin="normal"
                              name="primaryPhoneNumber"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.primaryPhoneNumber}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item sm={3} xs={4}>
                            <TextField
                              error={Boolean(
                                touched.secondaryCountryCode &&
                                  errors.secondaryCountryCode
                              )}
                              select
                              fullWidth
                              helperText={
                                touched.secondaryCountryCode &&
                                errors.secondaryCountryCode
                              }
                              label="Country Code"
                              margin="normal"
                              name="secondaryCountryCode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.secondaryCountryCode}
                              variant="outlined"
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
                          </Grid>
                          <Grid item sm={9} xs={8}>
                            <TextField
                              error={Boolean(
                                touched.secondaryPhoneNumber &&
                                  errors.secondaryPhoneNumber
                              )}
                              fullWidth
                              helperText={
                                touched.secondaryPhoneNumber &&
                                errors.secondaryPhoneNumber
                              }
                              label="Secondary Phone Number"
                              margin="normal"
                              name="secondaryPhoneNumber"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.secondaryPhoneNumber}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <TextField
                          error={Boolean(
                            touched.contactEmail && errors.contactEmail
                          )}
                          fullWidth
                          helperText={
                            touched.contactEmail && errors.contactEmail
                          }
                          label="Contact Email"
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
                  <Grid container sx={{ marginTop: "30px" }}>
                    <Grid container sx={{ marginBottom: "30px" }}>
                      <Grid
                        item
                        xs={10}
                        sm={5}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography variant="body1">
                          Have you filed your taxes with Taxcooler in the last
                          year?
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

                    <Grid container sx={{ marginBottom: "30px" }}>
                      <Grid
                        item
                        xs={8}
                        sm={5}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "30px",
                        }}
                      >
                        <Typography variant="body1">Taxpayer Status</Typography>
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
                  </Grid>
                  {values.taxPayerStatus === "MARRIED" && (
                    <Grid container spacing={2}>
                      {/* Left Side - Spouse Details */}
                      <Grid item lg={6} sm={6} xs={12}>
                        <Typography variant="h5">Spouse Details</Typography>
                        <Grid container spacing={2}>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Spouse First Name"
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Spouse Middle Initial"
                              margin="normal"
                              name="spouseMiddleInitial"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                              value={values.spouseMiddleInitial}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Spouse Last Name"
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Spouse SSN/ITIN"
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Do you want to apply for ITIN?"
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
                            </TextField>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Right Side - Spouse Contact */}
                      <Grid item lg={6} sm={6} xs={12}>
                        <Typography variant="h5">Spouse Contact</Typography>
                        <Grid container spacing={2}>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label=""
                              margin="normal"
                              name="spouseDateOfBirth"
                              onBlur={handleBlur}
                              fullWidth
                              onChange={handleChange}
                              type="date"
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
                            />
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Spouse Gender"
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
                            </TextField>
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Spouse Occupation / Job Title"
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Spouse Residential Status"
                              margin="normal"
                              name="spouseResidentialStatus"
                              onBlur={handleBlur}
                              fullWidth
                              select
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
                              <MenuItem value="VISA">Visa</MenuItem>
                              <MenuItem value="CITIZENSHIP">
                                Citizenship
                              </MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Spouse Email Id"
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
                    </Grid>
                  )}
                  <Grid container sx={{ marginBottom: "30px" }}>
                    <Grid
                      item
                      xs={10}
                      sm={9}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body1">
                        Have you (or your spouse, if married) provided living
                        support to your kids and/or dependents during the tax
                        year?
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={3}>
                      <TextField
                        label=""
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
                      </TextField>
                    </Grid>
                  </Grid>

                  {values.providedLivingSupport === true ? (
                    <Button
                      type="button"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        // Toggle between true and false
                        setFieldValue("isNewDependant", !values.isNewDependant);
                      }}
                      sx={{
                        display: "block",
                        width: "170px",
                        marginBottom: "16px",
                      }}
                    >
                      {values.isNewDependant
                        ? "Remove Dependant"
                        : "Add Dependant"}
                    </Button>
                  ) : null}

                  {values.isNewDependant && (
                    <Grid container spacing={2}>
                      {/* Left Side - additional Details */}
                      <Grid item lg={6} sm={6} xs={12}>
                        <Typography variant="h5">Additional Details</Typography>
                        <Grid container spacing={2}>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="First Name"
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Middle Initial"
                              margin="normal"
                              name={`additionalMiddleInitial`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                              value={values.additionalMiddleInitial}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Last Name"
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="SSN/ITIN"
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Do you want to apply for ITIN?"
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
                            </TextField>
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Relationship"
                              margin="normal"
                              name={`additionalRelationship`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
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
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Right Side - additional Contact */}
                      <Grid item lg={6} sm={6} xs={12}>
                        <Typography variant="h5">Additional Contact</Typography>
                        <Grid container spacing={2}>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Date of Birth"
                              margin="normal"
                              name={`additionalDateOfBirth`}
                              onBlur={handleBlur}
                              fullWidth
                              onChange={handleChange}
                              type="date"
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
                            />
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Gender"
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
                            </TextField>
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Occupation / Job Title"
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
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Visa Type"
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
                              {[
                                "H4",
                                "US Citizen",
                                "L2",
                                "Green Card",
                                "Other",
                              ].map((each, id) => {
                                return (
                                  <MenuItem key={id} value={each}>
                                    {each}
                                  </MenuItem>
                                );
                              })}
                            </TextField>
                          </Grid>
                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="Email Id"
                              margin="normal"
                              name={`additionalEmail`}
                              onBlur={handleBlur}
                              fullWidth
                              onChange={handleChange}
                              value={values.additionalEmail}
                              variant="outlined"
                              error={
                                touched.additionalEmail &&
                                errors.additionalEmail
                              }
                              helperText={
                                touched.additionalEmail &&
                                errors.additionalEmail
                              }
                            />
                          </Grid>

                          <Grid item sm={12} xs={12}>
                            <TextField
                              label="No. of months dependent has stayed with you in U.S"
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
                    </Grid>
                  )}
                  <Box>
                    {isDependantDetailsLoading ? (
                      <CircularProgress />
                    ) : (
                      <TableContainer
                        sx={{
                          marginTop: "32px",
                          paddingBottom: { xs: "10px", sm: "0px" },
                        }}
                      >
                        <Typography variant="h5">Dependant Details</Typography>
                        <Table
                          sx={{
                            borderCollapse: "collapse",
                          }}
                          aria-label="Place Order Series Table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className={customStyles.tableHeader}>
                                First Name
                              </TableCell>
                              <TableCell className={customStyles.tableHeader}>
                                Last Name
                              </TableCell>
                              <TableCell className={customStyles.tableHeader}>
                                SSN/ITIN
                              </TableCell>
                              <TableCell className={customStyles.tableHeader}>
                                Relationship
                              </TableCell>
                              <TableCell className={customStyles.tableHeader}>
                                Visa Type
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dependantDetails.length > 0 &&
                              dependantDetails.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell className={customStyles.tableData}>
                                    {row.additionalFirstName}
                                  </TableCell>
                                  <TableCell className={customStyles.tableData}>
                                    {row.additionalLastName}
                                  </TableCell>
                                  <TableCell className={customStyles.tableData}>
                                    {transform(row.additionalSsnOrItin)}
                                  </TableCell>
                                  <TableCell className={customStyles.tableData}>
                                    {row.additionalRelationship}
                                  </TableCell>
                                  <TableCell className={customStyles.tableData}>
                                    {row.additionalVisaType}
                                  </TableCell>
                                  <TableCell className={customStyles.tableData}>
                                    <Button
                                      disabled={isFilerDetailsLoading}
                                      startIcon={<DeleteIcon />}
                                      size="small"
                                      onClick={() => {
                                        handleDeleteDependant(row.id);
                                      }}
                                      className={customStyles.buttons}
                                    >
                                      Delete{" "}
                                      {isFilerDetailsLoading && (
                                        <CircularProgress
                                          sx={{ ml: 1 }}
                                          size={14}
                                        />
                                      )}
                                    </Button>
                                  </TableCell>
                                  <TableCell
                                    className={customStyles.mobileView}
                                  >
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
                                          disabled={isFilerDetailsLoading}
                                          startIcon={<DeleteIcon />}
                                          size="small"
                                          onClick={() => {
                                            handleDeleteDependant(row.id);
                                          }}
                                        >
                                          Delete{" "}
                                          {isFilerDetailsLoading && (
                                            <CircularProgress
                                              sx={{ ml: 1 }}
                                              size={14}
                                            />
                                          )}
                                        </Button>
                                      </Box>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      marginTop: { xs: "8px", sm: "16px" },
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      SAVE
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FilerDetails;
