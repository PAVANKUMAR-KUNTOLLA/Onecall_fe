import React from "react";
import Page from "../../components/Page";
import {
  Grid,
  Box,
  Typography,
  Button,
  Container,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: Yup.string().required("Contact number is required"),
});

const handleSubmit = (values) => {
  // Handle form submission here
  console.log(values);
};

const ReferFriend = () => {
  return (
    <Box>
      <Container>
        <Typography variant="h4">Referal Details:</Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, errors, touched, handleBlur }) => (
            <Form>
              <Grid container spacing={2} sx={{ marginLeft: "0px" }}>
                <Grid
                  container
                  sx={{
                    marginBottom: "30px",
                    marginTop: "30px",
                  }}
                >
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <TextField
                      label="First Name"
                      margin="normal"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.firstName}
                      variant="outlined"
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <TextField
                      label="Last Name"
                      margin="normal"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.lastName}
                      variant="outlined"
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <TextField
                      label="Email"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.email}
                      variant="outlined"
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <TextField
                      label="Contact"
                      margin="normal"
                      name="contact"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.contact}
                      variant="outlined"
                      error={Boolean(touched.contact && errors.contact)}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="center" // Center horizontally
                  alignItems="center" // Center vertically
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      paddingBottom: { xs: "20px" },
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        marginRight: { xs: "0px", sm: "130px" },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default ReferFriend;
