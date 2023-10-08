import React from "react";
import { Avatar, Box, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const customAppBarStyles = makeStyles((theme) => ({
  mainBlock: {
    backgroundImage: "url(/static/img/header.png)",
    backgroundSize: "100% 100%",
    padding: "20px 0",
  },
  logoAvatar: {
    marginLeft: "auto",
    marginRight: "auto",
    height: "42px",
    width: "120px",
  },
}));
const AppBar = () => {
  const customStyles = customAppBarStyles();
  return (
    <Box className={customStyles.mainBlock}>
      <Grid container>
        <Grid item sm={6}>
          <Avatar
            variant="square"
            src="/static/img/onecall-logo.png"
            className={customStyles.logoAvatar}
          />
        </Grid>
        <Grid item sm={6}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Button className={customStyles.buttons}>Tax Year</Button>
            <Button className={customStyles.buttons}>Profile</Button>
            <Button className={customStyles.buttons}>Refer to Earn</Button>
            <Button className={customStyles.buttons}>Logout</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppBar;
