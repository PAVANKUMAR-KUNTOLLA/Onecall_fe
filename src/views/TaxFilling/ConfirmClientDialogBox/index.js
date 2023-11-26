import React from "react";
import {
  Button,
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  CircularProgress,
  DialogTitle,
  IconButton,
  Typography,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

const customTextStyles = makeStyles((theme) => ({
  dialogBox: {
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "20px 20px 0px 0px",
      border: "1px solid rgba(151,151,151, 1)",
      boxShadow: "0px -3px 8px rgba(0,0,0, 0.1)",
    },
  },
  boldText: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "24px",
    marginBottom: "7px",
  },

  normalText: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "22px",
  },
  headerText: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "23px",
  },
  mainText: {
    opacity: 1,
    color: "rgba(71,71,71,1)",
    fontSize: "24px",
    fontWeight: "400",
    textAlign: "center",
    lineHeight: "33px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "27px",
      marginLeft: "8px",
      marginRight: "7px",
    },
  },
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "97.5%",
    top: "-4%",
    backgroundColor: "#F5A623",
    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      left: "93%",
      top: "-5%",
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  confirmButton: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "19px",
    backgroundColor: "#FFFFFF",
    padding: "10px 40px 9px",
    marginBottom: "4px",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
  },
}));

const ConfirmedClientConfirmationDialogBox = ({ open, handleClose }) => {
  const customStyles = customTextStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      classes={{ paper: customStyles.paper }}
      className={customStyles.dialogBox}
    >
      <DialogTitle
        id="scroll-dialog-title"
        sx={{ backgroundColor: "rgb(193, 210, 231)" }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: 600, color: "rgb(21, 66, 139)" }}
        >
          Confirmed Client
        </Typography>
      </DialogTitle>
      <DialogContent
        dividers={false}
        sx={{ backgroundColor: "rgb(193, 210, 231)" }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={customStyles.customizedButton}
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ margin: "5px 0" }}>
          Become a confirmed client by paying advance filing fee and we will
          complete your filing in 24 hours!!
        </Typography>
        <Typography sx={{ margin: "10px 0", color: "#11a63d" }}>
          How to become a confirmed client?
        </Typography>
        <Typography> - Upload all your tax related documents</Typography>
        <Typography sx={{ color: "#11a63d" }}>
          - Pay minimum standard filing fee of $50**{" "}
          <Box component="span" color="#474747 !important">
            ( visit "Pay Now" section to make the payment)
          </Box>
        </Typography>
        <Typography>
          - Send us an email confirming your advance fee payment
        </Typography>
        <Typography>
          {" "}
          - We will call you and complete your estimates (for both standard and
          itemized filing)
        </Typography>
        <Typography sx={{ color: "#11a63d" }}>
          {" "}
          - If you decide to go with itemized filing, standard filing fee will
          be deducted from your itemized filing fee
        </Typography>
        <Typography sx={{ marginTop: "10px" }}>
          * For missing information/complex returns, the estimated completion
          time can be greater but we will let you know in advance.
        </Typography>
        <Typography>
          ** Minimum Standard filing fee is for 1040 EZ returns with 1 state
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "center", backgroundColor: "rgb(193, 210, 231)" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="text"
            className={customStyles.confirmButton}
            onClick={handleClose}
            sx={{ marginRight: "15px", color: "#474747 !important" }}
          >
            Ok
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmedClientConfirmationDialogBox;
