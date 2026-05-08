import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function TableDashBoard({ header, data, page, rowsPerPage, handleChangePage }) {
  console.log("data:", data);
  console.log("page:", page);
  const count = Math.ceil(data?.length / rowsPerPage);

  const mapData = data?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  console.log("mapData:", mapData);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {header.map((item) => (
                <TableCell align={item.align}>{item.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {mapData?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.userId || 0}
                </TableCell>
                <TableCell align="right">{row.id || 0}</TableCell>
                <TableCell align="left">{row.title || "-"}</TableCell>
                <TableCell align="right">{row.body || "-"}</TableCell>
              </TableRow>
            ))}

            {data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={count}
        page={page}
        onChange={handleChangePage}
        color="primary"
      />
    </>
  );
}

export default TableDashBoard;
