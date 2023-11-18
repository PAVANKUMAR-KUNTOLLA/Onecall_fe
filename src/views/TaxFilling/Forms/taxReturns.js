import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GetApp, CloudUpload, FilterAltOffSharp } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Api from "../../../components/Api";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";
import CustomAlert from "../../../components/CustomAlert";

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
  const params = useParams();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });
  const role = useSelector((state) => state.app.role);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    isImport: false,
    isImpoFormSubmitting: false,
    selectedFile: {},
    remarks: "",
    isMyTaxDocsLoading: false,
    myTaxDocs: [],
  });

  const handleDownloadFile = (file) => {
    setIsLoading(true);

    let payload = {
      file_name: file,
      id: params.id,
      type: "returns",
    };

    privateApiPOST(Api.downloadTaxDocsFile, payload, { responseType: "blob" })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setIsLoading(false);
          const url = window.URL.createObjectURL(new Blob([data]));
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.setAttribute("download", file);
          document.body.appendChild(anchor);
          anchor.click();
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("handleDownloadFile--->", err);
        setIsLoading(false);
      });
  };

  const handleDeleteFile = (id, file) => {
    setIsLoading(true);

    let payload = {
      file_id: id,
      file_name: file,
      id: params.id,
      type: "returns",
    };

    privateApiPOST(Api.deleteTaxDocsFile, payload)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setShowAlert({
            isAlert: true,
            severity: "success",
            alertText: data?.["message"],
          });
          setIsLoading(false);
          handleFetchMyTaxDocs();
        }
      })
      .catch((err) => {
        console.log("handleDeleteFile--->", err);
        setShowAlert({
          isAlert: true,
          severity: "error",
          alertText: data?.["message"],
        });
        setIsLoading(false);
      });
  };

  //CLICK - Upload input file
  const handleUploadClick = (e) => {
    let file = e.target.files[0];
    if (file) {
      setState((prev) => ({
        ...prev,
        selectedFile: file,
      }));
    }
  };

  //SUBMIT - Import form
  const handleUploadTaxDocs = () => {
    if (!state.selectedFile.name) {
      setShowAlert({
        isAlert: true,
        severity: "warning",
        alertText: "Please choose file to import",
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      isImpoFormSubmitting: true,
    }));

    const formData = new FormData();
    formData.append("upload", state.selectedFile);
    formData.append("id", params.id);
    formData.append("type", "returns");
    formData.append("remarks", state.remarks);

    const token = sessionStorage.getItem("token");
    axios
      .post(Api.uploadTaxDocs, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setShowAlert({
            isAlert: true,
            severity: "success",
            alertText: data?.["message"],
          });
          setState((prev) => ({
            ...prev,
            selectedFile: {},
            isImpoFormSubmitting: false,
            isImport: false,
            remarks: "",
          }));
          handleFetchMyTaxDocs();
        }
      })
      .catch((error) => {
        console.log("handleUploadTaxDocs--->", error);
        const { data } = error.response;
        setShowAlert({
          isAlert: true,
          severity: "error",
          alertText: data?.["message"],
        });

        setState((prev) => ({
          ...prev,
          selectedFile: {},
          isImpoFormSubmitting: false,
          isImport: false,
          remarks: "",
        }));
      });
  };

  const handleFetchMyTaxDocs = () => {
    setState((prev) => ({ ...prev, isMyTaxDocsLoading: true }));
    let payload = { id: params.id, type: "returns" };
    privateApiPOST(Api.uploadTaxDocs, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setState((prev) => ({
            ...prev,
            isMyTaxDocsLoading: false,
            myTaxDocs: data?.data,
          }));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setState((prev) => ({ ...prev, isMyTaxDocsLoading: false }));
      });
  };

  useEffect(() => {
    handleFetchMyTaxDocs();
  }, []);
  return (
    <Box>
      {showAlert.isAlert && (
        <CustomAlert
          open={showAlert.isAlert}
          severity={showAlert.severity}
          alertTitle={showAlert.alertTitle}
          alertText={showAlert.alertText}
          onClose={() =>
            setShowAlert({
              isAlert: false,
              alertTitle: "",
              alertText: "",
              severity: "",
            })
          }
        />
      )}
      <Container>
        {role === "ADMIN" ? (
          <Box
            sx={{
              padding: "20px 0 5px",
              border: { xs: "none", sm: "1px solid #3A97BB" },
              minHeight: { xs: "auto", sm: "400px" },
            }}
          >
            <Typography variant="h4" sx={{ marginLeft: "10px" }}>
              Attach Client Tax Returns:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0",
              }}
            >
              <Typography sx={{ marginRight: "24px" }}>Upload File</Typography>
              <Box sx={{ marginRight: "20px" }}>
                <input
                  required
                  id="import-file-button"
                  type="file"
                  onChange={handleUploadClick}
                  accept=".xlsx"
                  style={{ opacity: 0, visibility: "hidden", width: "1px" }}
                />
                <label htmlFor="import-file-button">
                  <Button
                    startIcon={<CloudUploadIcon />}
                    component="span"
                    variant="contained"
                  >
                    Choose File
                  </Button>
                </label>
                <Typography sx={{ marginTop: "8px", fontStyle: "italic" }}>
                  {state.selectedFile.name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0",
              }}
            >
              <Typography sx={{ marginRight: "24px" }}>Remarks</Typography>
              <TextField
                size="large"
                name="remarks"
                value={state.remarks}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, remarks: e.target.value }))
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0",
              }}
            >
              <Button
                onClick={handleUploadTaxDocs}
                sx={{ marginBottom: "10px" }}
              >
                Upload Tax Returns
              </Button>
            </Box>
          </Box>
        ) : null}
        <Box
          sx={{
            padding: "20px 0 5px",
            border: { xs: "none", sm: "1px solid #3A97BB" },
            minHeight: { xs: "auto", sm: role === "ADMIN" ? "400px" : "800px" },
          }}
        >
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
                  <TableCell className={customStyles.tableHeader}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.myTaxDocs.length > 0 &&
                  state.myTaxDocs.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className={customStyles.tableData}>
                        {row.id}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.file_name.replace(/^[^_]*_([^_]*_)/, "")}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.upload_time}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.remarks}
                      </TableCell>
                      <TableCell className={customStyles.buttons}>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            disabled={isLoading}
                            startIcon={<GetApp />}
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              handleDownloadFile(row.file_name);
                            }}
                          >
                            Download{" "}
                          </Button>
                          <Button
                            disabled={isLoading}
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={() => {
                              handleDeleteFile(row.id, row.file_name);
                            }}
                            sx={{
                              display: role === "ADMIN" ? "flex" : "none",
                            }}
                          >
                            Delete{" "}
                          </Button>
                        </Box>
                      </TableCell>

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
                              File Name
                            </Typography>

                            <Typography
                              className={customStyles.mobileViewTableCellValue}
                            >
                              {row.file_name.replace(/^[^_]*_([^_]*_)/, "")}
                            </Typography>
                          </Box>
                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={customStyles.mobileViewTableCellHeader}
                            >
                              Upload Time
                            </Typography>

                            <Typography
                              className={customStyles.mobileViewTableCellValue}
                            >
                              {row.upload_time}
                            </Typography>
                          </Box>

                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={customStyles.mobileViewTableCellHeader}
                            >
                              Remarks
                            </Typography>

                            <Typography
                              className={customStyles.mobileViewTableCellValue}
                            >
                              {row.remarks}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              marginTop: "16px",
                            }}
                          >
                            <Button
                              disabled={isLoading}
                              startIcon={<GetApp />}
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                handleDownloadFile(row.file_name);
                              }}
                            >
                              Download{" "}
                              {isLoading && (
                                <CircularProgress sx={{ ml: 1 }} size={14} />
                              )}
                            </Button>
                            <Button
                              disabled={isLoading}
                              startIcon={<DeleteIcon />}
                              size="small"
                              onClick={() => {
                                handleDeleteFile(row.file_name);
                              }}
                              sx={{
                                display: role === "ADMIN" ? "flex" : "none",
                              }}
                            >
                              Delete{" "}
                              {isLoading && (
                                <CircularProgress sx={{ ml: 1 }} size={14} />
                              )}
                            </Button>
                          </Box>
                        </Box>
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

export default TaxReturns;
