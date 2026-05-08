import {
  Pagination,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

function TableEditUsers({
  header,
  data,
  page,
  rowsPerPage,
  handleChangePage,
  handleEditUser,
}) {
  const count = Math.ceil(data?.length / rowsPerPage);

  const mapData = data?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* TableHead */}
          <TableHead>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              {header.map((item) => (
                <TableCell align={item.align}>{item.label}</TableCell>
              ))}
              <TableCell align="center">แก้ไข</TableCell>
            </TableRow>
          </TableHead>

          {/* TableBody */}
          <TableBody>
            {mapData?.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: i % 2 === 0 ? "#f5f5f5" : "initial",
                  "&:hover": { backgroundColor: "#eceff1" },
                }}>
                <TableCell align="center">
                  {(page - 1) * rowsPerPage + i + 1}
                </TableCell>

                {header.map((item) => (
                  <TableCell align={item.align}>{row[item.value]}</TableCell>
                ))}
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditUser(row)}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {/* Table ไม่ */}
            {data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={header.length + 2} align="center">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {console.log("data?.length > rowsPerPage:", data?.length > rowsPerPage)}
      {data?.length > rowsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
          <Pagination
            count={count}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
    </>
  );
}

export default TableEditUsers;
