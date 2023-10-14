import * as React from "react";
import PropTypes from "prop-types";

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
  AppBar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PaidIcon from "@mui/icons-material/Paid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const customAppBarStyles = makeStyles((theme) => ({
  mainBlock: {
    backgroundImage: "url(/static/img/header.png)",
    backgroundSize: "100% 100%",
    padding: "10px 0",
  },
  logoAvatar: {
    maxHeight: "42px",
    maxWidth: "120px !important",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "200px",
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
const navItems = ["HOME", "TAX YEAR", "REFER", "PROFILE"];
const navIcons = [HomeIcon, NoteAddIcon, PaidIcon, AccountCircleIcon];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

  const handleNavMenu = (value) => {
    let path = value;
    navigate(path);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      {/* <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography> */}
      <Box className={customStyles.account}>
        <Avatar
          // {...stringAvatar(userInfo.name)}
          {...stringAvatar("Kuntolla Pavan Kumar")}
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
          Kuntolla Pavan Kumar
        </Typography>
      </Box>
      <hr></hr>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <AppBar component="nav" className={customStyles.mainBlock}>
        <Toolbar>
          <IconButton
            color="#000000"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            variant="square"
            src="/static/img/onecall-logo.png"
            sx={{
              flexGrow: 1,
            }}
            className={customStyles.logoAvatar}
          />

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              minWidth: "50%",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginRight: "80px",
            }}
          >
            {navItems.map((item, index) => (
              <Button
                key={item}
                sx={{ color: "primary", fontSize: "16px" }}
                onClick={() => handleNavMenu(item.toLowerCase())}
              >
                {React.createElement(navIcons[index], {
                  sx: { marginRight: 1 },
                })}
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
