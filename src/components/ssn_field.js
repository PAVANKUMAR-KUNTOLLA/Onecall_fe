import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { Typography, TextField } from "@mui/material";

const SSN = ({
  error,
  helperText,
  name,
  value: ssnValue,
  setFieldValue,
  alignLeft,
}) => {
  const [completeSSN, setCompleteSSN] = useState(ssnValue);

  // useEffect(() => {
  //   setCompleteSSN(ssnValue || "");
  // }, [ssnValue]);

  const handleSSN1Change = (e) => {
    const value = e.target.value;
    if (value.charAt(0) === "9") {
      setCompleteSSN("");
    } else if (value.length <= 3) {
      const updatedSSN = `${value}-${ssn2}-${ssn3}`;
      setCompleteSSN(updatedSSN);
      setFieldValue(name, updatedSSN.replaceAll("-", ""));
    }
  };

  const handleSSN2Change = (e) => {
    const value = e.target.value;
    if (value.charAt(0) === "9") {
      setCompleteSSN("");
    } else if (value.length <= 2) {
      const updatedSSN = `${ssn1}-${value}-${ssn3}`;
      setCompleteSSN(updatedSSN);
      setFieldValue(name, updatedSSN.replaceAll("-", ""));
    }
  };

  const handleSSN3Change = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      const updatedSSN = `${ssn1}-${ssn2}-${value}`;
      setCompleteSSN(updatedSSN);
      setFieldValue(name, updatedSSN.replaceAll("-", ""));
    }
  };

  const ssnParts = completeSSN.split("-");
  const ssn1 = ssnParts[0] || "";
  const ssn2 = ssnParts[1] || "";
  const ssn3 = ssnParts[2] || "";

  return (
    <Grid
      item
      xs={12}
      sx={{
        maxHeight: "60px",
        marginTop: "12px",
      }}
    >
      <Grid container>
        <Grid item xs={4} sx={{ marginTop: "12px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: { xs: 0, sm: "5px" },
              justifyContent: {
                xs: "flex-start",

                sm: alignLeft ? "flex-start" : "flex-end",
              },
            }}
          >
            <Typography variant="body1">SSN</Typography>
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
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid item xs={3}>
              <TextField
                type="text"
                id="ssn1"
                name="ssn1"
                size="3"
                variant="outlined"
                value={ssn1}
                onChange={handleSSN1Change}
                error={error}
                helperText={helperText}
                inputProps={{ maxLength: 3 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "0.1px solid #bdbdbd",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px",
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={0.5}>
              -
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="text"
                id="ssn2"
                name="ssn2"
                size="2"
                variant="outlined"
                value={ssn2}
                onChange={handleSSN2Change}
                inputProps={{ maxLength: 2 }}
                error={error}
                helperText={helperText}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "0.1px solid #bdbdbd",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px",
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={0.5}>
              -
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="text"
                id="ssn3"
                name="ssn3"
                size="4"
                variant="outlined"
                value={ssn3}
                onChange={handleSSN3Change}
                inputProps={{ maxLength: 4 }}
                error={error}
                helperText={helperText}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "0.1px solid #bdbdbd",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px",
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                  width: "100%",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SSN;
