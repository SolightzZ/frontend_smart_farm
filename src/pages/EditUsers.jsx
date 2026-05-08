import { useEffect, useState } from "react";
import TableEditUsers from "../components/dashBoards/TableEditUsers";
import {
  GET,
  GETDATAUSER,
  POST,
  POSTDATAUSER,
  PUTDATAUSER,
  PUT,
  USER,
} from "../services/Api";
import { TableEditUser } from "../utils/Static";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

function EditUsers() {
  // Data User (แสดง , เปลี่ยนค่า)
  const [dataUser, setDataUser] = useState([]);

  // [แสดงข้อมูล, เปลี่ยนข้อมูล(ว่าง, มีข้อมูล)]

  const [data, setData] = useState([]);

  console.log("data:", data);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // เก็บข้อมูลจากฟอร์ม EditUser
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState({});

  const GetDataUser = async () => {
    const res = await GET(USER);
    console.log("res:", res);
    try {
      if (res.success) {
        setData(res.result);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // เปิด Dialog
  const handleEditUser = (data) => {
    setOpenDialog(true);
    setDataDialog(data);
  };

  // รับข้อมูลจากฟอร์ม
  const handleChange = (e) => {
    setDataDialog({
      ...dataDialog,
      [e.target.name]: e.target.value,
    });
  };

  // ปิด Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // ส่งข้อมูล จากปุ่ม ไปที่ PostDataUser
  const handleSumit = (data) => {
    console.log("data:", data);
    if (data) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          PostDataUser(data);
          setOpenDialog(false);
        }
      });
    }
  };

  // ส่งข้อมูล จากฟอร์ม ไปที่ API
  const PostDataUser = async (data) => {
    try {
      const res = await PUT(`${PUTDATAUSER}${data.user_id}`, {
        username: data.username,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        role: data.role,
        zone: data.zone,
        gender: data.gender,
      });

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "แก้ไขสำเร็จ",
        });

        GetDataUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // GET ข้อมูลมาตลอด
  useEffect(() => {
    GetDataUser();
  }, []);

  return (
    <>
      {/* < (1) > */}
      <TableEditUsers
        handleEditUser={handleEditUser}
        header={TableEditUser}
        data={data}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
      />

      {/* แก้ไข */}
      <Box>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{ width: "100%", pb: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                แก้ไขข้อมูล
              </Typography>

              <Chip
                label={dataDialog.role}
                color="success"
                sx={{ fontWeight: "bold" }}
              />
            </Box>
          </DialogTitle>

          {/* < (Edit USer) > */}
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              {/* </Grid> */}

              <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="ชื่อ"
                    name="username"
                    fullWidth
                    value={dataDialog.username}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="นามสกุล"
                    fullWidth
                    name="lastname"
                    value={dataDialog.lastname}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
              </Grid>

              {/* </Grid> */}
              <Grid size={12}>
                <TextField
                  label="อีเมล"
                  name="email"
                  fullWidth
                  value={dataDialog.email}
                  onChange={handleChange}
                ></TextField>
              </Grid>
              <Grid size={12}>
                <TextField
                  label="เบอร์โทร"
                  fullWidth
                  name="phone"
                  value={dataDialog.phone}
                  onChange={handleChange}
                ></TextField>
              </Grid>
              <Grid size={12}>
                <TextField
                  label="โซน"
                  fullWidth
                  name="zone"
                  value={dataDialog.zone}
                  onChange={handleChange}
                ></TextField>
              </Grid>

              <Button
                variant="outlined"
                size="large"
                color="success"
                onClick={() => handleSumit(dataDialog)}
              >
                {<CheckCircleIcon />} บันทึก
              </Button>

              <Button
                variant="outlined"
                size="large"
                color="error"
                onClick={handleCloseDialog}
              >
                {<CloseIcon />} ยกเลิก
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}

export default EditUsers;
