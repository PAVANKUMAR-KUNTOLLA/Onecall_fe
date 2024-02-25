import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { Typography, TextField } from "@mui/material";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
  error,
  helperText,
  name,
  label,
  value,
  setFieldValue,
}) => {
  const range = (start, end, step) => {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  };

  const getYear = (date) => {
    return date.getFullYear();
  };

  const years = range(1900, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Grid
      item
      xs={12}
      sx={{
        maxHeight: "60px",
        marginTop: "12px",
      }}
    >
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item xs={4} sx={{}}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: { xs: 0, sm: "5px" },
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="body1">{label}</Typography>
            <Typography
              sx={{
                color: "red",
                fontSize: "0.875rem",
                marginLeft: "3px",
              }}
            >
              *
            </Typography>
            &nbsp;:
          </Box>
        </Grid>
        <Grid item xs={8}>
          <DatePicker
            placeholderText={"MM/DD/YYYY"}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[date.getMonth]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
            selected={value}
            onChange={(date) => setFieldValue(name, date)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomDatePicker;
