import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Typography,
  Toolbar,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Button,
  List,
  IconButton,
  Drawer,
  Divider,
  CssBaseline,
  Box,
  ListItem,
  Container,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import Api from "../../components/Api";

const customAppBarStyles = makeStyles((theme) => ({
  mainBlock: {
    backgroundImage: "url(/static/img/header.png)",
    backgroundSize: "100% 100%",
    padding: "10px 0",
  },
  logoAvatar: {
    [theme.breakpoints.up("sm")]: {
      //   marginLeft: "200px",
      marginRight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "150px",
    },
  },
  account: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
  },
}));

const drawerWidth = 240;
const navItems = ["HOME", "REFER", "LOGOUT"]; // "PROFILE",
const navIcons = [HomeIcon, PaidIcon, ExitToAppIcon]; //, AccountCircleIcon,

function AppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const state = useSelector((state) => state.app);

  const customStyles = customAppBarStyles();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  function stringAvatar(name) {
    if (name.split(" ").length === 1) {
      return {
        children: `${name.split(" ")[0][0]}`,
      };
    }
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const handleLogout = () => {
    privateApiPOST(Api.logout)
      .then((response) => {
        const { status } = response;
        if (status === 204) {
          sessionStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleNavMenu = (value) => {
    let path = value;
    if (path === "logout") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  function stringAvatar(name) {
    if (name.split(" ").length == 1) {
      return {
        children: `${name.split(" ")[0][0]}`,
      };
    }
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      {/* <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography> */}
      <Box className={customStyles.account}>
        <Avatar
          // {...stringAvatar(state.name)}
          {...stringAvatar(state.first_name + state.last_name)}
          sx={{
            width: "75px",
            height: "75px",
            fontSize: "24px",
            color: "white",
            backgroundColor: "rgb(0,76,153,0.8)",
          }}
          // onClick={() => handleLinkClick("profile")}
        />

        <Typography className={customStyles.title} variant="h6" sx={{ my: 2 }}>
          {state.first_name + " " + state.last_name}
        </Typography>
      </Box>
      <hr></hr>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: "start" }}>
              <ListItemIcon>
                {React.createElement(navIcons[index])}
              </ListItemIcon>
              <ListItemText
                primary={item}
                onClick={() => handleNavMenu(item.toLowerCase())}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ marginTop: "10px" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Avatar
                variant="square"
                src="/static/img/onecall-logo.png"
                sx={{
                  height: 50,
                  width: 140,
                  marginBottom: "10px",
                }}
                className={customStyles.logoAvatar}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: "16px",
                  marginTop: "12px",
                  marginLeft: "20px",
                }}
              >
                PERFECT PLACE TO FILE YOUR TAXES
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontSize: "16px" }}>
              <strong>Phone:</strong> (248) 971-3300
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "16px" }}>
              <strong>E-mail:</strong> Onecalltaxservices.digital@gmail.com
            </Typography>
          </Box>
          <Avatar
            variant="square"
            src="/static/img/irs_image.jpg"
            sx={{ width: "81px", height: "83px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <Typography sx={{ color: "rgb(255, 0, 0)" }}>
            <strong>BEST WAY TO CONTACT US : PLEASE SEND AN EMAIL TO</strong>{" "}
            onecalltaxservices.digital@gmail.com
          </Typography>

          <Typography sx={{ fontSize: "16px" }}>
            {" "}
            <strong>Welcome:</strong> {state.email}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {["HOME", "REFER"].map((each, index) => (
              <Button
                key={index}
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  flex: 1,
                  marginRight: "30px",
                  maxHeight: "30px",
                  padding: "6px 15px",
                  "&:hover": {
                    backgroundColor: "#2069DB",
                    color: "#ffffff",
                  },
                }}
                onClick={() => handleNavMenu(each.toLowerCase())}
                variant="contained"
              >
                {each}
              </Button>
            ))}
          </Box>
          <Box sx={{ alignItems: "end" }}>
            <Button
              sx={{
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "400",
                backgroundColor: "red",
                maxHeight: "30px",
                padding: "6px 15px",
                "&:hover": {
                  backgroundColor: "lightcoral",
                  color: "#ffffff",
                },
              }}
              onClick={() => handleNavMenu("logout")}
            >
              LOGOUT
            </Button>
          </Box>
        </Box>
        <hr></hr>
      </Container>
    </Box>
  );
}

AppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AppBar;
