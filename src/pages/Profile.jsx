import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TableProfile from "../components/TableProfile";
import {
  GET,
  POST,
  POSTDATAUSER,
  PROFILE,
  PUT,
  PUTPROFILE,
} from "../services/Api";

function Profile() {
  const [dataProfile, setDataProfile] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleEditProfile = (dataProfile) => {
    setOpenDialog(true);
    setSelectedProfile(dataProfile);
    console.log("Selected Profile:", dataProfile);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProfile(null);
  };

  const handleChange = (e) => {
    setSelectedProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (data) => {
    console.log(data);
    if (!data) return;

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
  };

  const PostDataUser = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        role: data.role,
        address: data.address,
        phone: data.phone,
        email: data.email,
      };

      const res = await PUT(PUTPROFILE + data.profile_id, payload);

      console.log("Saved:", res);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "แก้ไขโปรไฟล์สำเร็จ",
        });

        // update state ทันที
        setDataProfile((prev) =>
          prev.map((item) =>
            item.profile_id === data.profile_id
              ? {
                  ...item,
                  ...payload,
                }
              : item,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetDataProfile = async () => {
    const res = await GET(PROFILE);
    console.log("res:", res);
    try {
      if (res.success) {
        setDataProfile(res.result);
      } else {
        setDataProfile([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Current Data Count:", dataProfile?.length, dataProfile[0]);

  useEffect(() => {
    GetDataProfile();
  }, []);

  return (
    <Box>
      <TableProfile
        handleEditProfile={handleEditProfile}
        dataProfile={dataProfile}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Typography variant="h5" sx={{ mt: 2, p: 2 }}>
          แก้ไขข้อมูล
        </Typography>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {/* <Grid container spacing={2} sx={{ width: "100%" }}> */}
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="ชื่อ"
                  name="firstName"
                  fullWidth
                  value={selectedProfile?.firstName || ""}
                  onChange={handleChange}
                ></TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="นามสกุล"
                  name="lastName"
                  fullWidth
                  value={selectedProfile?.lastName || ""}
                  onChange={handleChange}
                ></TextField>
              </Grid>
            </Grid>

            {/* <Grid size={{ xs: 12 }}> */}
            <Grid size={{ xs: 12 }}>
              <FormControl
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 1,
                  width: "100%",
                }}
              >
                <FormLabel id="gender-radio-group-label" color="white">
                  เพศ
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={selectedProfile?.gender || ""}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="ชาย"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="หญิง"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="อื่นๆ"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="อาชีพ"
                name="role"
                fullWidth
                value={selectedProfile?.role || ""}
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="ที่อยู่"
                name="address"
                fullWidth
                value={selectedProfile?.address || ""}
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                type="tel"
                label="เบอร์โทร"
                name="phone"
                fullWidth
                value={selectedProfile?.phone || ""}
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="อีเมล"
                name="email"
                type="email"
                fullWidth
                value={selectedProfile?.email || ""}
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Button
              variant="outlined"
              size="large"
              color="success"
              onClick={() => handleSubmit(selectedProfile)}
            >
              {<CheckCircleIcon />} บันทึก
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseDialog}
            >
              {<CloseIcon />} ยกเลิก
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Profile;
