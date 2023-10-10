import React, { useEffect, useState, useRef } from "react";
import config from "../../config";
// Material UI
import { Grid, Box, Avatar, Typography, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";

import PropTypes from "prop-types";
import PercentIcon from "@mui/icons-material/Percent";
import Groups from "@mui/icons-material/Groups";
import ListAlt from "@mui/icons-material/ListAlt";
import AspectRatioOutlined from "@mui/icons-material/AspectRatioOutlined";
import UnfoldLess from "@mui/icons-material/UnfoldLess";
import UnfoldMore from "@mui/icons-material/UnfoldMore";
import DiscountOutlined from "@mui/icons-material/DiscountOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";
import InsertPageBreakOutlined from "@mui/icons-material/InsertPageBreakOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import StackedBarChartOutlined from "@mui/icons-material/StackedBarChartOutlined";
import PriceCheckOutlined from "@mui/icons-material/PriceCheckOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const customTextStyles = makeStyles((theme) => ({
  accordion: {
    marginBottom: "8px",
    borderRadius: "10px",
    "&.MuiPaper-elevation": {
      boxShadow: "none !important",
    },
    "&:before": {
      backgroundColor: "transparent !important",
    },
  },
  accordionHeader: {
    opacity: 1,
    paddingLeft: "12px",
    paddingTop: "8px",
    paddingBottom: "8px",
    maxHeight: "60px",
  },
  accordionHeaderText: {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#474747",
  },
  accordionColumn: {
    marginTop: "24px",
  },
  accordionColumnHeaderText: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "600",
    marginTop: "10px",
    marginBottom: "4px",
  },
  accordionColumnText: {
    fontSize: "13px",
    lineHeight: "19px",
    fontWeight: "400",
  },
  footerText: {
    opacity: 0.8,
    fontSize: "11px",
    fontWeight: 400,
    lineHeight: "19px",
    marginTop: "26px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  collpaseIcon: {
    // height: "9px",
    // width: "9px",
    opacity: 1,
    color: "#474747",
  },
}));

const TabsDesktop = () => {
  const customTextClasses = customTextStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          width: "100%",
          marginBottom: "64px",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            margin: "8px 32px 32px 10px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Features & Benefits"
              className={customTextClasses.tabHeaderText}
              {...a11yProps(0)}
            />
            <Tab
              label="SGB Tranche Dates"
              className={customTextClasses.tabHeaderText}
              {...a11yProps(1)}
            />
            <Tab
              label="FAQs"
              className={customTextClasses.tabHeaderText}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Grid container>
            <Grid item xs={12}>
              <Box>
                <Typography
                  className={customTextClasses.headerTitle}
                  sx={{ marginBottom: "-4px" }}
                >
                  Features of SGB Investment
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className={customTextClasses.tabColumn}>
                <Avatar
                  sx={{ bgcolor: config.tabsIconBgColor }}
                  alt="Percent icon"
                >
                  <PercentIcon color="primaryMain" />
                </Avatar>
                <Typography className={customTextClasses.tabColumnHeaderText}>
                  Interest Rate
                </Typography>
                <Typography className={customTextClasses.tabColumnText}>
                  2.50% per annum on initial investment, payable semi annually
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className={customTextClasses.tabColumn}>
                <Avatar
                  sx={{ bgcolor: config.tabsIconBgColor }}
                  alt="Percent icon"
                >
                  <Groups color="primaryMain" />
                </Avatar>
                <Typography className={customTextClasses.tabColumnHeaderText}>
                  Eligible Investors
                </Typography>
                <Typography className={customTextClasses.tabColumnText}>
                  It can be held by any Indian resident individual, Trusts,
                  HUFs, Charitable Institution, University, individual on behalf
                  of minor child, or jointly with any other individual.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className={customTextClasses.tabColumn}>
                <Avatar
                  sx={{ bgcolor: config.tabsIconBgColor }}
                  alt="Percent icon"
                >
                  <ListAlt color="primaryMain" />
                </Avatar>
                <Typography className={customTextClasses.tabColumnHeaderText}>
                  Listing
                </Typography>
                <Typography className={customTextClasses.tabColumnText}>
                  BSE / NSE
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container>
            <Grid item xs={12}>
              <Box>
                <Typography className={customTextClasses.headerTitle}>
                  SGB Tranche Dates Coming Soon
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Grid container>
            <Grid item xs={12}>
              <Box>
                <Typography className={customTextClasses.headerTitle}>
                  FAQs Coming Soon
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </Grid>
  );
};
export default TabsDesktop;
