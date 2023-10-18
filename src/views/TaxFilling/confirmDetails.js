import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { statesNames, countryCode } from "../../constants";

const useStyles = makeStyles((theme) => ({}));

const ConfirmDetails = ({
  id,
  personalDetails,
  contactDetails,
  spouseDetails,
  dependantDetails,
  incomeDetails,
  bankDetails,
}) => {
  const classes = useStyles();
  const stateOptions = statesNames;
  const countryCodes = countryCode;
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

    providedLivingSupport: dependantDetails["providedLivingSupport"],
    additionalFirstName: dependantDetails["additionalFirstName"],
    additionalMiddleInitial: dependantDetails["additionalMiddleInitial"],
    additionalLastName: dependantDetails["additionalLastName"],
    additionalSsnOrItin: dependantDetails["additionalSsnOrItin"],
    additionalApplyForItin: dependantDetails["additionalApplyForItin"], // Default to "No"
    additionalDateOfBirth: dependantDetails["additionalDateOfBirth"],
    additionalGender: dependantDetails["additionalGender"],
    additionalOccupation: dependantDetails["additionalOccupation"],
    additionalVisaType: dependantDetails["additionalVisaType"],
    additionalEmail: dependantDetails["additionalEmail"],
    additionalStayCount: dependantDetails["additionalStayCount"],
    additionalRelationship: dependantDetails["additionalRelationship"],

    //Income Details
    interestIncome: incomeDetails["interestIncome"],
    dividendIncome: incomeDetails["dividendIncome"],
    soldStocks: incomeDetails["soldStocks"],
    soldCrypto: incomeDetails["soldCrypto"],
    foreignIncome: incomeDetails["foreignIncome"],
    retirementAccounts: incomeDetails["retirementAccounts"],
    stateTaxRefund: incomeDetails["stateTaxRefund"],
    foreignBankAccount: incomeDetails["foreignBankAccount"],
    foreignAssets: incomeDetails["foreignAssets"],
    rentalIncome: incomeDetails["rentalIncome"],
    income1099: incomeDetails["income1099"],
    incomeDescription: incomeDetails["incomeDescription"],
    incomeAmount: incomeDetails["incomeAmount"],
    addAdditionalInformation: false,

    //Bank Details
    bankingType: bankDetails["bankingType"],
    bankName: bankDetails["bankName"],
    accountHolderName: bankDetails["accountHolderName"],
    ownership: bankDetails["ownership"],
    routingNumber: bankDetails["routingNumber"],
    confirmRoutingNumber: bankDetails["confirmRoutingNumber"],
    accountNumber: bankDetails["accountNumber"],
    confirmAccountNumber: bankDetails["confirmAccountNumber"],
    accountType: bankDetails["accountType"],
    confirmAccountType: bankDetails["confirmAccountType"],
  });
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={6} xs={12}>
            <Box className={classes.leftSide}>
              <Typography variant="h5">Personal Details</Typography>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                name="firstName"
                disabled
                value={formData.firstName}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Middle Name"
                margin="normal"
                name="middleName"
                value={formData.middleName}
                disabled
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                name="lastName"
                disabled
                value={formData.lastName}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="SSN"
                margin="normal"
                name="ssn"
                value={formData.ssn}
                disabled
                variant="outlined"
              />
              <TextField
                fullWidth
                label=""
                margin="normal"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                disabled
                variant="outlined"
              />
              <TextField
                select
                fullWidth
                label="Gender"
                margin="normal"
                name="gender"
                value={formData.gender}
                disabled
                variant="outlined"
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Occupation"
                margin="normal"
                name="occupation"
                value={formData.occupation}
                disabled
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Residential Status (Visa Type / Citizenship)"
                margin="normal"
                name="residentialStatus"
                value={formData.residentialStatus}
                variant="outlined"
                disabled
              />
            </Box>
          </Grid>

          {/* Right Side - Contact Details */}
          <Grid item lg={6} sm={6} xs={12}>
            <Box className={classes.rightSide}>
              <Typography variant="h5">Contact Details</Typography>
              <TextField
                fullWidth
                label="Street"
                margin="normal"
                name="street"
                value={formData.street}
                disabled
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Apartment"
                margin="normal"
                name="apartment"
                value={formData.apartment}
                variant="outlined"
                disabled
              />
              <TextField
                fullWidth
                label="City"
                margin="normal"
                name="city"
                value={formData.city}
                disabled
                variant="outlined"
              />
              <TextField
                select
                fullWidth
                label="State"
                margin="normal"
                name="state"
                value={formData.state}
                variant="outlined"
                disabled
              >
                {stateOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Zip Code"
                margin="normal"
                name="zipCode"
                value={formData.zipCode}
                variant="outlined"
                disabled
              />
              <TextField
                select
                fullWidth
                label="Country"
                margin="normal"
                name="country"
                value={formData.country}
                disabled
                variant="outlined"
              >
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <Grid container spacing={2}>
                <Grid item sm={3} xs={4}>
                  <TextField
                    select
                    fullWidth
                    label="country code"
                    margin="normal"
                    name="primaryCountryCode"
                    value={formData.primaryCountryCode}
                    disabled
                    variant="outlined"
                  >
                    {countryCodes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={9} xs={8}>
                  <TextField
                    fullWidth
                    label="Primary Phone Number"
                    margin="normal"
                    name="primaryPhoneNumber"
                    value={formData.primaryPhoneNumber}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={3} xs={4}>
                  <TextField
                    select
                    fullWidth
                    label="Country Code"
                    margin="normal"
                    name="secondaryCountryCode"
                    value={formData.secondaryCountryCode}
                    variant="outlined"
                    disabled
                  >
                    {countryCodes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={9} xs={8}>
                  <TextField
                    fullWidth
                    label="Secondary Phone Number"
                    margin="normal"
                    name="secondaryPhoneNumber"
                    value={formData.secondaryPhoneNumber}
                    variant="outlined"
                    disabled
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Contact Email"
                margin="normal"
                name="contactEmail"
                value={formData.contactEmail}
                variant="outlined"
                disabled
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
                Have you filed your taxes with Taxcooler in the last year?
              </Typography>
            </Grid>
            <Grid item xs={2} sm={1}>
              <select
                id="taxFiledLastYear"
                name="taxFiledLastYear"
                value={formData.taxFiledLastYear}
                style={{ width: "100%" }}
                disabled
              >
                <option value="">Select Option</option>{" "}
                {/* Add an empty option */}
                <option value="0">Yes</option>
                <option value="1">No</option>
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
                value={formData.taxPayerStatus}
                style={{ width: "100%" }}
                disabled
              >
                <option value="">Select Status</option>{" "}
                {/* Add an empty option */}
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
              </select>
            </Grid>
          </Grid>
        </Grid>
        {formData.taxPayerStatus === "MARRIED" && (
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
                    fullWidth
                    value={formData.spouseFirstName}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label="Spouse Middle Initial"
                    margin="normal"
                    name="spouseMiddleInitial"
                    fullWidth
                    value={formData.spouseMiddleInitial}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label="Spouse Last Name"
                    margin="normal"
                    name="spouseLastName"
                    fullWidth
                    value={formData.spouseLastName}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label="Spouse SSN/ITIN"
                    margin="normal"
                    name="spouseSsnOrItin"
                    fullWidth
                    value={formData.spouseSsnOrItin}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label="Do you want to apply for ITIN?"
                    select
                    margin="normal"
                    name="applyForItin"
                    fullWidth
                    value={formData.applyForItin}
                    variant="outlined"
                    disabled
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
                    fullWidth
                    type="date"
                    value={formData.spouseDateOfBirth}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label="Spouse Gender"
                    select
                    margin="normal"
                    name="spouseGender"
                    fullWidth
                    value={formData.spouseGender}
                    variant="outlined"
                    disabled
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
                    fullWidth
                    value={formData.spouseOccupation}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label="Spouse Residential Status"
                    margin="normal"
                    name="spouseResidentialStatus"
                    fullWidth
                    value={formData.spouseResidentialStatus}
                    variant="outlined"
                    disabled
                  >
                    <MenuItem value="VISA">Visa</MenuItem>
                    <MenuItem value="CITIZENSHIP">Citizenship</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label="Spouse Email Id"
                    margin="normal"
                    name="spouseEmail"
                    fullWidth
                    value={formData.spouseEmail}
                    variant="outlined"
                    disabled
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
              Have you (or your spouse, if married) provided living support to
              your kids and/or dependents during the tax year?
            </Typography>
          </Grid>
          <Grid item xs={2} sm={3}>
            <TextField
              label=""
              select
              margin="normal"
              name="providedLivingSupport"
              value={formData.providedLivingSupport}
              variant="outlined"
              disabled
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        {formData.providedLivingSupport === true && (
          <Grid container spacing={2}>
            {/* Left Side - additional Details */}
            <Grid item lg={6} sm={6} xs={12}>
              <Typography variant="h5">additional Details</Typography>
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=" First Name"
                    margin="normal"
                    name="additionalFirstName"
                    fullWidth
                    value={formData.additionalFirstName}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=" Middle Initial"
                    margin="normal"
                    name="additionalMiddleInitial"
                    fullWidth
                    value={formData.additionalMiddleInitial}
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=" Last Name"
                    margin="normal"
                    name="additionalLastName"
                    fullWidth
                    value={formData.additionalLastName}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=" SSN/ITIN"
                    margin="normal"
                    name="additionalSsnOrItin"
                    fullWidth
                    value={formData.additionalSsnOrItin}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label="Do you want to apply for ITIN?"
                    select
                    margin="normal"
                    name="applyForItin"
                    fullWidth
                    value={formData.applyForItin}
                    variant="outlined"
                    disabled
                  >
                    <MenuItem value={false}>No</MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Side - additional Contact */}
            <Grid item lg={6} sm={6} xs={12}>
              <Typography variant="h5">additional Contact</Typography>
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=""
                    margin="normal"
                    name="additionalDateOfBirth"
                    fullWidth
                    type="date"
                    value={formData.additionalDateOfBirth}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=" Gender"
                    select
                    margin="normal"
                    name="additionalGender"
                    fullWidth
                    value={formData.additionalGender}
                    variant="outlined"
                    disabled
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=" Occupation / Job Title"
                    margin="normal"
                    name="additionalOccupation"
                    fullWidth
                    value={formData.additionalOccupation}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=" Residential Status"
                    margin="normal"
                    name="additionalResidentialStatus"
                    fullWidth
                    value={formData.additionalResidentialStatus}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    label=" Email Id"
                    margin="normal"
                    name="additionalEmail"
                    fullWidth
                    value={formData.additionalEmail}
                    variant="outlined"
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
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
                value={formData.interestIncome}
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
                value={formData.dividendIncome}
                disabled
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
                value={formData.soldStocks}
                disabled
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
                value={formData.soldCrypto}
                disabled
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
                value={formData.foreignIncome}
                disabled
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
                value={formData.retirementAccounts}
                disabled
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
                value={formData.stateTaxRefund}
                disabled
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
                Do you have Account Balance in Foreign banks exceeding more than
                $10,000?
              </FormLabel>
              <RadioGroup
                name="foreignBankAccount"
                value={formData.foreignBankAccount}
                disabled
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
                Do you have Foreign Assets value more than $50,000 at any time
                during the tax year?
              </FormLabel>
              <RadioGroup
                name="foreignAssets"
                value={formData.foreignAssets}
                disabled
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
                value={formData.rentalIncome}
                disabled
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
                Do you have 1099-Misc/1099-NEC Income in year 2022?
              </FormLabel>
              <RadioGroup
                name="income1099"
                value={formData.income1099}
                disabled
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
              <Typography variant="h5">Other Income Information</Typography>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Income Description"
                  margin="normal"
                  fullWidth
                  value={formData.incomeDescription}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Income Amount"
                  margin="normal"
                  fullWidth
                  value={formData.incomeAmount}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
            The IRS and certain State Revenue Departments facilitate DIRECT
            DEPOSIT / WITHDRAWAL of Tax Refund or Tax Dues on the Tax Returns.
            If you are interested in availing this option, we request you to
            kindly input the following details.
          </Typography>

          <Grid container sx={{ marginBottom: "30px", marginTop: "30px" }}>
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
                value={formData.bankingType}
                style={{ width: "100%" }}
                disabled
              >
                <option value="">Select Option</option>
                <option value="DIRECT DEPOSIT INTO MY BANK ACCOUNT">
                  Direct deposit into my bank account
                </option>
                <option value="PAPER CHECK">Paper Check</option>
              </select>
            </Grid>
          </Grid>

          {formData.bankingType === "DIRECT DEPOSIT INTO MY BANK ACCOUNT" && (
            <Grid>
              {/* Additional Fields for Direct Deposit */}
              <Typography
                variant="h5"
                sx={{ marginTop: "30px", marginLeft: "15px" }}
              >
                Direct Deposit Information
              </Typography>
              <Typography sx={{ marginTop: "30px", marginLeft: "15px" }}>
                Note : Please understand that there is no risk by entering Bank
                Account and Routing Numbers
              </Typography>
              <Grid container spacing={2}>
                <Grid item lg={6} sm={6} xs={12}>
                  <TextField
                    label="Bank Name"
                    margin="normal"
                    name="bankName"
                    fullWidth
                    value={formData.bankName}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    label="Account Holder Name"
                    margin="normal"
                    name="accountHolderName"
                    fullWidth
                    value={formData.accountHolderName}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    label="Ownership"
                    margin="normal"
                    name="ownership"
                    select
                    fullWidth
                    value={formData.ownership}
                    variant="outlined"
                    disabled
                  >
                    <MenuItem value="0">Tax Payer / Spouse</MenuItem>
                    <MenuItem value="1">Joint</MenuItem>
                  </TextField>

                  <TextField
                    label="Routing Number"
                    margin="normal"
                    name="routingNumber"
                    fullWidth
                    value={formData.routingNumber}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    label="Confirm Routing Number"
                    margin="normal"
                    name="confirmRoutingNumber"
                    fullWidth
                    value={formData.confirmRoutingNumber}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                  <TextField
                    label="Account Number"
                    margin="normal"
                    name="accountNumber"
                    fullWidth
                    value={formData.accountNumber}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    label="Confirm Account Number"
                    margin="normal"
                    name="confirmAccountNumber"
                    fullWidth
                    value={formData.confirmAccountNumber}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    label="Account Type"
                    margin="normal"
                    name="accountType"
                    select
                    fullWidth
                    value={formData.accountType}
                    variant="outlined"
                    disabled
                  >
                    <MenuItem value="SAVINGS">Savings</MenuItem>
                    <MenuItem value="CHECKING">Checking</MenuItem>
                  </TextField>
                  <TextField
                    label="Confirm Account Type"
                    margin="normal"
                    name="confirmAccountType"
                    select
                    fullWidth
                    value={formData.confirmAccountType}
                    variant="outlined"
                    disabled
                  >
                    <MenuItem value="SAVINGS">Savings</MenuItem>
                    <MenuItem value="CHECKING">Checking</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Confirm Personal Details To Pick An Appointment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ConfirmDetails;
