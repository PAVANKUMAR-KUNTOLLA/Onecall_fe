import React, { useState, useEffect, Component } from "react";
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
import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";

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
  const [isReferalDetailsLoading, setIsReferalDetailsLoading] = useState(false);
  const [referalDetails, setReferalDetails] = useState({
    joined: [],
    not_joined: [],
  });

  const handleFetchReferalDetails = () => {
    privateApiGET(Api.referalDetails)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setReferalDetails({
            joined: data?.data["joined"],
            not_joined: data?.data["not_joined"],
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchReferalDetails();
    }
  }, []);
  console.log(referalDetails);
  return (
    <Box>
      <Container>
        <Box>
          <Typography variant="h4" sx={{ marginLeft: "10px" }}>
            Registerd Till Now:
          </Typography>
          <TableContainer sx={{ marginTop: "32px" }}>
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
                {referalDetails["joined"].length > 0 &&
                  referalDetails["joined"].map((row, id) => (
                    <TableRow key={id}>
                      <TableCell className={customStyles.tableData}>
                        {row.first_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.last_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.email}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.phone_no}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ marginTop: { xs: "16px", sm: "24px" } }}>
          <Typography variant="h4" sx={{ marginLeft: "10px" }}>
            Referred Till Now:
          </Typography>
          <TableContainer sx={{ marginTop: "32px" }}>
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
                {referalDetails["not_joined"].length > 0 &&
                  referalDetails["not_joined"].map((row, id) => (
                    <TableRow key={id}>
                      <TableCell className={customStyles.tableData}>
                        {row.first_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.last_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.email}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.contact_no}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default MyReferrals;
