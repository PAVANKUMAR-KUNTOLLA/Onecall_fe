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

const TaxReturns = () => {
  const customStyles = customTextStyles();
  return (
    <Box>
      <Container>
        <Box>
          <TableContainer sx={{ marginTop: "32px" }}>
            <Typography variant="h4" sx={{ marginLeft: "10px" }}>
              Tax Return Document List:
            </Typography>
            <Table
              sx={{
                borderCollapse: "collapse",
                marginTop: "30px",
              }}
              aria-label="Place Order Series Table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={customStyles.tableHeader}>ID</TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Document Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    uploaded on
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Remarks
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={customStyles.tableData}></TableCell>
                  <TableCell className={customStyles.tableData}></TableCell>
                  <TableCell className={customStyles.tableData}></TableCell>
                  <TableCell className={customStyles.tableData}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default TaxReturns;
