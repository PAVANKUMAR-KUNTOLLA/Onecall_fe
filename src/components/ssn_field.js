import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

const SSN = ({
  error,
  helperText,
  value: ssnValue,
  onChange: handleParentChange,
}) => {
  const [completeSSN, setCompleteSSN] = useState("");

  useEffect(() => {
    setCompleteSSN(ssnValue || "");
  }, [ssnValue]);

  const handleSSN1Change = (e) => {
    const value = e.target.value;
    if (value.charAt(0) === "9") {
      setCompleteSSN("");
    } else if (value.length <= 3) {
      const updatedSSN = `${value}-${ssn2}-${ssn3}`;
      setCompleteSSN(updatedSSN);
      handleParentChange(updatedSSN);
    }
  };

  const handleSSN2Change = (e) => {
    const value = e.target.value;
    if (value.charAt(0) === "9") {
      setCompleteSSN("");
    } else if (value.length <= 2) {
      const updatedSSN = `${ssn1}-${value}-${ssn3}`;
      setCompleteSSN(updatedSSN);
      handleParentChange(updatedSSN);
    }
  };

  const handleSSN3Change = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      const updatedSSN = `${ssn1}-${ssn2}-${value}`;
      setCompleteSSN(updatedSSN);
      handleParentChange(updatedSSN);
    }
  };

  const ssnParts = completeSSN.split("-");
  const ssn1 = ssnParts[0] || "";
  const ssn2 = ssnParts[1] || "";
  const ssn3 = ssnParts[2] || "";

  return (
    <Box>
      <tr>
        <td align="right" style={{ padding: "8px", paddingLeft: "135px" }}>
          <div>
            &nbsp;SSN
            <font
              color="red"
              size="3"
              style={{ marginLeft: "3px", marginBottom: "30px" }}
            >
              &nbsp;*
            </font>
          </div>
        </td>

        <td>:</td>
        <td colSpan="2" align="left" style={{ padding: "8px" }}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            sx={{ paddingLeft: "0px" }}
          >
            <Grid item xs={2}>
              <TextField
                type="text"
                id="ssn1"
                name="ssn1"
                size="3"
                variant="outlined"
                value={ssn1}
                onChange={handleSSN1Change}
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
            <Grid item xs={2}>
              <TextField
                type="text"
                id="ssn2"
                name="ssn2"
                size="2"
                variant="outlined"
                value={ssn2}
                onChange={handleSSN2Change}
                inputProps={{ maxLength: 2 }}
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
            <Grid item xs={2}>
              <TextField
                type="text"
                id="ssn3"
                name="ssn3"
                size="4"
                variant="outlined"
                value={ssn3}
                onChange={handleSSN3Change}
                inputProps={{ maxLength: 4 }}
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
        </td>
      </tr>
    </Box>
  );
};

export default SSN;
