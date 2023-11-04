import React from "react";
import { Box, TextField, Grid, Typography } from "@mui/material";

const CustomInputTextField = ({ attribute, is_required, ...others }) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={4} sx={{ marginTop: "24px" }}>
          {/* <Typography
            sx={{
              margin: "20px 10px",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 400,
            }}
          >
            {is_required ? (
              <>
                {attribute}
                <span
                  style={{
                    color: "red", // Set color to red
                    fontSize: "16px",
                    marginLeft: "3px",
                  }}
                >
                  {" "}
                  *
                </span>
              </>
            ) : (
              attribute
            )}
          </Typography> */}

          <Typography variant="body1">
            <span>{attribute}</span>
            {is_required && (
              <span
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginLeft: "3px",
                }}
              >
                *
              </span>
            )}
            &nbsp;:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            {...others}
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
              width: "90%",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomInputTextField;
