import React from "react";

import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";
import { customTextStyles } from "../../UsersDisplay";

const SummaryRefundPage = ({ data, isLoadingSpin, handlePageChange }) => {
  const customStyles = customTextStyles();
  return (
    <Box
      sx={{
        margin: "10px",
        border: "1px solid #DDDDDD",
        padding: "20px 20px 40px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          onClick={handlePageChange}
          style={{ minHeight: "25px", padding: "5px" }}
        >
          Back to Add Refund
        </button>
      </Box>

      <TableContainer sx={{ marginTop: "16px" }}>
        <Table
          sx={{
            borderCollapse: "collapse",
          }}
          aria-label="Place Order Series Table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#CCEEEE" }}>
              <TableCell className={customStyles.tableHeader}>
                Refund Type
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Standard Refund
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Standard Fee
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Itemized Refund
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Itemized Fee
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Discount
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Paid Advance
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Max Itemized Refund
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Max Itemized Fee
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row, id) => (
                <TableRow key={id}>
                  <TableCell className={customStyles.tableData}>
                    {row.refund_type}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.standard_refund}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.standard_fee}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.itemized_refund}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.itemized_fee}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.discount}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.paid_advance}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.max_itemized_refund}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.max_itemized_fee}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SummaryRefundPage;
