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
} from "@mui/material";
import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";

const PickAppointment = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
  });

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "23:00",
    timezone: "CST",
  });

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
  const handleFetchProfileData = () => {
    privateApiGET(Api.profile)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          let info = data?.data;
          setUserInfo((prev) => ({
            ...prev,
            id: info.id,
            first_name: info.first_name,
            last_name: info.last_name,
            phone_no: info.phone_no,
          }));
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const showMsg = () => {
    // Add your showMsg function logic here
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchProfileData();
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
              value={`${userInfo?.first_name} ${userInfo?.last_name}`}
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
              value={userInfo ? userInfo.phone_no : ""}
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
            10/15/2023 to 12/31/2023
          </Typography>
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "30px" }}>
          <Grid item xs={12} sm={4}>
            <TextField
              type="date"
              value={appointmentData.date}
              onChange={handleDateChange}
              fullWidth
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
              sx={{ width: "80%" }}
            >
              <MenuItem value="CST">CST</MenuItem>
              {/* Add more time zones as needed */}
            </TextField>
          </Grid>
        </Grid>
        <Typography variant="body1" color="red" sx={{ marginTop: "30px" }}>
          Maximum number of appointments you can have is "ONE". If you already
          have an appointment delete it before scheduling new appointment
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={showMsg}
          sx={{ display: "block", margin: "0 auto", marginTop: "20px" }}
        >
          SUBMIT
        </Button>
      </Container>
    </Box>
  );
};

export default PickAppointment;
