import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  CircularProgress,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GetApp, CloudUpload, FilterAltOffSharp } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import CustomAlert from "../../components/CustomAlert";
import axios from "axios";

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

const UploadTaxDocs = ({ id }) => {
  const customStyles = customTextStyles();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    isImport: false,
    isImpoFormSubmitting: false,
    selectedFile: {},
    isMyTaxDocsLoading: false,
    myTaxDocs: [],
  });

  const handleDownloadFile = (file) => {
    setIsLoading(true);

    let payload = {
      file_name: file,
      id: id,
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

  const handleDeleteFile = (file) => {
    setIsLoading(true);

    let payload = {
      file_name: file,
      id: id,
    };

    privateApiPOST(Api.deleteTaxDocsFile, payload)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setIsLoading(false);
          handleFetchMyTaxDocs();
        }
      })
      .catch((err) => {
        console.log("handleDeleteFile--->", err);
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
    formData.append("id", id);

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
        }));
      });
  };

  const handleFetchMyTaxDocs = () => {
    setState((prev) => ({ ...prev, isMyTaxDocsLoading: true }));
    privateApiGET(Api.uploadTaxDocs)
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
    <>
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
      <Box display="flex" justifyContent="flex-end">
        <Box>
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
        <Button onClick={handleUploadTaxDocs}>Upload</Button>
      </Box>
      <Box>
        {state.isMyTaxDocsLoading ? (
          <CircularProgress />
        ) : (
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
                    File Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Upload Time
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    File Size
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.myTaxDocs.length > 0 &&
                  state.myTaxDocs.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className={customStyles.tableData}>
                        {row.file_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.upload_time}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.file_size}
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={isLoading}
                          startIcon={<DeleteIcon />}
                          size="small"
                          onClick={() => {
                            handleDeleteFile(row.file_name);
                          }}
                        >
                          Delete{" "}
                          {isLoading && (
                            <CircularProgress sx={{ ml: 1 }} size={14} />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default UploadTaxDocs;
