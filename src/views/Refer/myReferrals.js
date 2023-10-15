import React, { Component } from "react";
import {
  Grid,
  Box,
  Link,
  Avatar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

export const customTextStyles = makeStyles((theme) => ({
  tableHeader: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "23px",
  },
  tableData: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "22px",
  },
  headerText: {
    fontSize: "24px",
    fontWeight: "600",
    marginTop: "32px",
    marginBottom: "16px",
    color: "#2069DB",
  },
  confirmButton: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "19px",
    color: "#FFFFFF",
    padding: "10px 40px 9px",
    marginBottom: "4px",
  },
}));

const MyReferrals = () => {
  const customStyles = customTextStyles();
  return (
    <Box>
      <Container>
        <Box>
          <TableContainer sx={{ marginTop: "32px" }}>
            <Typography variant="h4" sx={{ marginLeft: "10px" }}>
              Registerd Till Now:
            </Typography>
            <Table
              sx={{
                borderCollapse: "collapse",
              }}
              aria-label="Place Order Series Table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={customStyles.tableHeader}>
                    First Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Last Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Email Id
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Phone Number
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={customStyles.tableData}>
                    Kuntolla{" "}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    Pavan kumar
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    Kuntollapavankumar@gmail.com
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    944161023
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <TableContainer sx={{ marginTop: "32px" }}>
            <Typography variant="h4" sx={{ marginLeft: "10px" }}>
              Referred Till Now:
            </Typography>
            <Table
              sx={{
                borderCollapse: "collapse",
              }}
              aria-label="Place Order Series Table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={customStyles.tableHeader}>
                    First Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Last Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Email Id
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Phone Number
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={customStyles.tableData}>
                    Kuntolla{" "}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    Pavan kumar
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    Kuntollapavankumar@gmail.com
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    944161023
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default MyReferrals;
