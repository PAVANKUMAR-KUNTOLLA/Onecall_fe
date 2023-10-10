import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
import { Grid, Box, Avatar, Typography } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

import config from "../../config";
import { makeStyles } from "@mui/styles";

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

export default function BasicAccordion() {
  const customTextClasses = customTextStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel1" ? (
              <RemoveIcon
                size={10}
                className={customTextClasses.collpaseIcon}
              />
            ) : (
              <AddIcon size={10} className={customTextClasses.collpaseIcon} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel1" ? "600" : "400" }}
          >
            Features & Benefits
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#FAFAFA",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box className={customTextClasses.accordionColumn}>
                <Avatar
                  sx={{ bgcolor: config.tabsIconBgColor }}
                  alt="Percent icon"
                >
                  <PercentIcon color="primaryMain" />
                </Avatar>
                <Typography
                  className={customTextClasses.accordionColumnHeaderText}
                >
                  Interest Rate
                </Typography>
                <Typography className={customTextClasses.accordionColumnText}>
                  2.50% per annum on initial investment, payable semi annually
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={customTextClasses.accordionColumn}>
                <Avatar
                  sx={{ bgcolor: config.tabsIconBgColor }}
                  alt="Percent icon"
                >
                  <Groups color="primaryMain" />
                </Avatar>
                <Typography
                  className={customTextClasses.accordionColumnHeaderText}
                >
                  Eligible Investors
                </Typography>
                <Typography className={customTextClasses.accordionColumnText}>
                  It can be held by any Indian resident individual, Trusts,
                  HUFs, Chariaccordionle Institution, University, individual on
                  behalf of minor child, or jointly with any other individual.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={customTextClasses.accordionColumn}>
                <Avatar
                  sx={{ bgcolor: config.tabsIconBgColor }}
                  alt="Percent icon"
                >
                  <ListAlt color="primaryMain" />
                </Avatar>
                <Typography
                  className={customTextClasses.accordionColumnHeaderText}
                >
                  Listing
                </Typography>
                <Typography className={customTextClasses.accordionColumnText}>
                  BSE / NSE
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel2" ? (
              <RemoveIcon
                size={10}
                className={customTextClasses.collpaseIcon}
              />
            ) : (
              <AddIcon size={10} className={customTextClasses.collpaseIcon} />
            )
          }
          aria-controls="panel2a-content"
          id="panel2a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel2" ? "600" : "400" }}
          >
            SGB Tranche Dates
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <Grid container>
            <Grid item xs={12}>
              <Box>
                <Typography className={customTextClasses.headerTitle}>
                  SGB Tranche Dates Coming Soon
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel3" ? (
              <RemoveIcon
                size={10}
                className={customTextClasses.collpaseIcon}
              />
            ) : (
              <AddIcon size={10} className={customTextClasses.collpaseIcon} />
            )
          }
          aria-controls="panel3a-content"
          id="panel3a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel3" ? "600" : "400" }}
          >
            FAQs
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <Grid container>
            <Grid item xs={12}>
              <Box>
                <Typography className={customTextClasses.headerTitle}>
                  FAQs Coming Soon
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
