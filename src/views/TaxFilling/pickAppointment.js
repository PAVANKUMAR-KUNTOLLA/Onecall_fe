import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../../components/Api";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import { makeStyles } from "@mui/styles";

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

const PickAppointment = ({ id }) => {
  const customStyles = customTextStyles();
  const [isPickAppointmentDetailsLoading, setIsPickAppointmentDetailsLoading] =
    useState(false);
  const state = useSelector((state) => state.app);

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "23:00",
    timezone: "America/Chicago",
  });
  const [appointmentDetails, setAppointmentDetails] = useState([]);

  const handleDateChange = (event) => {
    setAppointmentData({
      ...appointmentData,
      date: event.target.value,
    });
  };

  const handleTimeChange = (event) => {
    setAppointmentData({
      ...appointmentData,
      time: event.target.value,
    });
  };

  const handleTimezoneChange = (event) => {
    setAppointmentData({
      ...appointmentData,
      timezone: event.target.value,
    });
  };

  const handleCancelAppointment = (appointmentId) => {
    setIsPickAppointmentDetailsLoading(true);
    let payload = { id: id, appointmentId: appointmentId };
    privateApiPOST(Api.deleteAppointment, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setIsPickAppointmentDetailsLoading(false);
          handleFetchAppointmentDetails();
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsPickAppointmentDetailsLoading(false);
      });
  };

  const handleFetchAppointmentDetails = () => {
    setIsPickAppointmentDetailsLoading(true);
    let payload = { id: id };
    privateApiPOST(Api.appointmentDetails, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setIsPickAppointmentDetailsLoading(false);
          setAppointmentDetails(data?.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsPickAppointmentDetailsLoading(false);
      });
  };
  const handleFetchAppointmentChange = (payload) => {
    setIsPickAppointmentDetailsLoading(true);

    privateApiPOST(Api.bookAppointment, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setIsPickAppointmentDetailsLoading(false);
          setAppointmentData({
            date: "",
            time: "23:00",
            timezone: "America/Chicago",
          });
          handleFetchAppointmentDetails();
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsPickAppointmentDetailsLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = { ...appointmentData, id: id };
    handleFetchAppointmentChange(payload);
  };

  const showMsg = () => {
    // Add your showMsg function logic here
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchAppointmentDetails();
    }
  }, []);

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hours = 11; hours <= 23; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const hourStr = String(hours).padStart(2, "0");
        const minuteStr = String(minutes).padStart(2, "0");
        const timeOption = `${hourStr}:${minuteStr}`;
        timeOptions.push(timeOption);
      }
    }
    return timeOptions;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Box>
      <Container>
        <Typography variant="h5">
          Tax Notes Interview - Schedule your date:
        </Typography>
        <Grid container sx={{ marginTop: "30px" }}>
          <Grid item sm={5} xs={12} sx={{ marginRight: "20px" }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={`${state.first_name} ${state.last_name}`}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid
            item
            sm={5}
            xs={12}
            sx={{ marginTop: { xs: "10px" }, marginRight: "20px" }}
          >
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_no"
              value={state ? state.phone_no : ""}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="body1" color="red" sx={{ marginTop: "30px" }}>
          Become a confirmed client by making an advance fee payment. Same day
          tax filing available for Confirmed Clients.
        </Typography>
        <br />
        <Typography variant="body1" color="green" sx={{ marginTop: "10px" }}>
          How to become a Confirmed Client?&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={showMsg}
            sx={{ marginTop: { xs: "10px" } }}
          >
            CLICK HERE
          </Button>
        </Typography>

        <Typography variant="body1" color="red" sx={{ marginTop: "30px" }}>
          {`We will call you anytime between 11.00 AM CST to 11.30 PM CST on your appointment date.`}
        </Typography>
        <Typography variant="body1" color="red" sx={{ marginLeft: "10px" }}>
          {`- We try to match your preferred time. Unfortunately, it is not a guaranteed time.`}
        </Typography>
        <Typography variant="body1" color="red" sx={{ marginLeft: "10px" }}>
          {`- We try to match your preferred time. Unfortunately, it is not a guaranteed time.`}
        </Typography>
        <Typography variant="body1" color="red" sx={{ marginTop: "30px" }}>
          Please pick your availability between{" "}
          <Typography variant="body1" color="primary" component="span">
            01/11/2023 to 04/18/2023
          </Typography>
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ marginTop: "30px" }}>
            <Grid item xs={12} sm={4}>
              <TextField
                type="date"
                value={appointmentData.date}
                onChange={handleDateChange}
                fullWidth
                required
                sx={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Time"
                value={appointmentData.time}
                onChange={handleTimeChange}
                variant="outlined"
                fullWidth
                required
                sx={{ width: "80%" }}
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                value={appointmentData.timezone}
                onChange={handleTimezoneChange}
                fullWidth
                required
                sx={{ width: "80%" }}
              >
                <MenuItem value="America/Chicago">CST</MenuItem>
                <MenuItem value="EST">EST</MenuItem>
                {/* Add more time zones as needed */}
              </TextField>
            </Grid>
          </Grid>
          <Typography variant="body1" color="red" sx={{ marginTop: "30px" }}>
            Maximum number of appointments you can have is "ONE". If you already
            have an appointment delete it before scheduling new appointment
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={showMsg}
            sx={{ display: "block", margin: "0 auto", marginTop: "20px" }}
          >
            SUBMIT
          </Button>
        </form>
        <Box>
          {isPickAppointmentDetailsLoading ? (
            <CircularProgress />
          ) : (
            <TableContainer
              sx={{
                marginTop: "32px",
                paddingBottom: { xs: "10px", sm: "0px" },
              }}
            >
              <Table
                sx={{
                  borderCollapse: "collapse",
                }}
                aria-label="Place Order Series Table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={customStyles.tableHeader}>
                      Date
                    </TableCell>
                    <TableCell className={customStyles.tableHeader}>
                      Start Time
                    </TableCell>
                    <TableCell className={customStyles.tableHeader}>
                      End Time
                    </TableCell>
                    <TableCell className={customStyles.tableHeader}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointmentDetails.length > 0 &&
                    appointmentDetails.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className={customStyles.tableData}>
                          {row.date}
                        </TableCell>
                        <TableCell className={customStyles.tableData}>
                          {row.start_time}
                        </TableCell>
                        <TableCell className={customStyles.tableData}>
                          {row.end_time}
                        </TableCell>
                        <TableCell className={customStyles.tableData}>
                          {row.status}
                        </TableCell>
                        <TableCell
                          sx={{
                            visibility:
                              row.status === "BOOKED" ? "visible" : "hidden",
                            display: { xs: "none", sm: "block" },
                          }}
                          className={customStyles.tableData}
                        >
                          <Button
                            disabled={isPickAppointmentDetailsLoading}
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={() => {
                              handleCancelAppointment(row.id);
                            }}
                            className={customStyles.buttons}
                          >
                            Delete{" "}
                            {isPickAppointmentDetailsLoading && (
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
                                  Date
                                </Typography>

                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellValue
                                  }
                                >
                                  {row.date}
                                </Typography>
                              </Box>
                              <Box sx={{ marginTop: "3px" }}>
                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellHeader
                                  }
                                >
                                  Status
                                </Typography>

                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellValue
                                  }
                                >
                                  {row.status}
                                </Typography>
                              </Box>
                              <Box sx={{ marginTop: "3px" }}>
                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellHeader
                                  }
                                >
                                  Start Time
                                </Typography>

                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellValue
                                  }
                                >
                                  {row.start_time}
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
                                  End Time
                                </Typography>

                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellValue
                                  }
                                >
                                  {row.end_time}
                                </Typography>
                              </Box>
                              <Box
                              // sx={{
                              //   display: "flex",
                              //   justifyContent: "center", // Center the button horizontally
                              //   alignItems: "center",
                              // }}
                              >
                                <Button
                                  disabled={isPickAppointmentDetailsLoading}
                                  startIcon={<DeleteIcon />}
                                  size="small"
                                  onClick={() => {
                                    handleCancelAppointment(row.id);
                                  }}
                                  sx={{
                                    visibility:
                                      row.status === "BOOKED"
                                        ? "visible"
                                        : "hidden",
                                  }}
                                >
                                  Delete{" "}
                                  {isPickAppointmentDetailsLoading && (
                                    <CircularProgress
                                      sx={{ ml: 1 }}
                                      size={14}
                                    />
                                  )}
                                </Button>
                              </Box>
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
      </Container>
    </Box>
  );
};

export default PickAppointment;
