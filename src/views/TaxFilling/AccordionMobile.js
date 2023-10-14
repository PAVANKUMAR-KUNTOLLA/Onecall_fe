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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import config from "../../config";
import { makeStyles } from "@mui/styles";
import BankDetails from "./bankDetails";
import FilerDetails from "./filerDeatils";
import IncomeDetails from "./incomeDetails";

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

const BasicAccordion = ({ data }) => {
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
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel1" ? "600" : "400" }}
          >
            Filer Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#FAFAFA",
          }}
        >
          <FilerDetails />
          {/* <Grid container>
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
          </Grid> */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel2" ? "600" : "400" }}
          >
            Income Deatils
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <IncomeDetails />
          {/* <Grid container>
            <Grid item xs={12}>
              <Box>
                <Typography className={customTextClasses.headerTitle}>
                  SGB Tranche Dates Coming Soon
                </Typography>
              </Box>
            </Grid>
          </Grid> */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel3" ? "600" : "400" }}
          >
            Bank Deatails
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <BankDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel3" ? "600" : "400" }}
          >
            Upload Tax Docs
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
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel5" ? "600" : "400" }}
          >
            Tax Returns
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
};

export default BasicAccordion;
