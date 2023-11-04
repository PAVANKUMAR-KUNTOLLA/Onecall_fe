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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tableData: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "22px",
    [theme.breakpoints.down("sm")]: {
      // marginBottom: "8px",
      display: "none",
    },
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
  mobileViewTableCellValue: {
    color: "rgb(71, 71, 71)",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "19px",
  },
  mobileView: {
    borderRadius: "4px",
    boxShadow: "0px 0px 5px rgba(0,0,0, 0.1)",
    backgroundColor: "rgba(255,255,255, 1) !important",
    cursor: "pointer",
    border: "none !important",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  mobileViewTableCellHeader: {
    color: "rgb(245, 166, 35)",
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "14px",
  },
}));

const TaxReturns = () => {
  const customStyles = customTextStyles();
  return (
    <Box
      sx={{
        padding: "20px 0 5px",
        border: { xs: "none", sm: "1px solid #3A97BB" },
        minHeight: { xs: "auto", sm: "800px" },
      }}
    >
      {" "}
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
                  <TableCell className={customStyles.mobileView}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "16px",
                      }}
                    >
                      <Box sx={{ marginTop: "3px" }}>
                        <Typography
                          className={customStyles.mobileViewTableCellHeader}
                        >
                          ID
                        </Typography>

                        <Typography
                          className={customStyles.mobileViewTableCellValue}
                        ></Typography>
                      </Box>
                      <Box sx={{ marginTop: "3px" }}>
                        <Typography
                          className={customStyles.mobileViewTableCellHeader}
                        >
                          Document Name
                        </Typography>

                        <Typography
                          className={customStyles.mobileViewTableCellValue}
                        ></Typography>
                      </Box>

                      <Box sx={{ marginTop: "3px" }}>
                        <Typography
                          className={customStyles.mobileViewTableCellHeader}
                        >
                          uploaded on
                        </Typography>

                        <Typography
                          className={customStyles.mobileViewTableCellValue}
                        ></Typography>
                      </Box>
                      <Box sx={{ marginTop: "3px" }}>
                        <Typography
                          className={customStyles.mobileViewTableCellHeader}
                        >
                          Remarks
                        </Typography>

                        <Typography
                          className={customStyles.mobileViewTableCellValue}
                        ></Typography>
                      </Box>
                    </Box>
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

export default TaxReturns;
