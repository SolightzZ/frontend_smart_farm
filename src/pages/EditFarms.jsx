import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormFarms from "../components/FormFarms";
import { FARM, GET, POST, POSTDATAUSER, PUT, PUTFARM } from "../services/Api"; // import function API

function EditFarms() {
  const [searchfarms, setSearchFarms] = useState(""); // state เก็บค่าค้นหา

  const [openDialog, setOpenDialog] = useState(false); // state เปิด/ปิด dialog
  const [dataFarmsDialog, setDataFarmsDialog] = useState({
    farm_name: "",
    crop: "",
    areaSize: "",
    sensorCount: 0,
    deviceCount: 0,
    location: {
      lat: 0,
      lng: 0,
    },

    // state เก็บข้อมูลฟาร์มที่กำลังแก้ไข
  });
  const [selectedPlant, setSelectedPlant] = useState(""); //state เก็บข้อมูลพืชที่กำลังแก้ไข

  // ฟังก์ชันเปลี่ยนค่าค้นหา
  const hadleSearchChange = (e) => {
    setSearchFarms(e.target.value);
  };
  // state เก็บข้อมูลฟาร์มทั้งหมด
  const [dataFarms, setDataFarms] = useState([]);
  const handleClick = (e) => {};

  const GetDataFarm = async () => {
    const res = await GET(FARM);
    console.log("res:", res);
    try {
      if (res.success) {
        setDataFarms(res.result);
      } else {
        setDataFarms([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // กดปุ่ม edit -> เปิด dialog + ใส่ข้อมูลฟาร์ม
  const handleEditFarms = (item) => {
    setOpenDialog(true);

    setDataFarmsDialog({
      ...item,
      location: item.location || {
        lat: 0,
        lng: 0,
      },
    });
  };

  // ปิด dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // handle input change (ใช้กับ field ทั่วไป)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataFarmsDialog((prev) => ({
      ...prev,
      [name]:
        name === "sensorCount" || name === "deviceCount"
          ? Number(value)
          : value,
    }));
  };

  // กด submit
  const handleSumit = (dataFarmsDialog) => {
    console.log(dataFarmsDialog);
    // เช็คว่ามีข้อมูล
    if (dataFarmsDialog) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          PostDataFarms(dataFarmsDialog); // ยิง API
          setOpenDialog(false);
        }
      });
    }
  };

  const PostDataFarms = async (datafarms) => {
    try {
      const res = await PUT(`${PUTFARM}${datafarms.farm_id}`, datafarms);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "แก้ไขสำเร็จ",
        });

        GetDataFarm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // }
  // const GetDataFarms = async () => {
  //   try {
  //     const res = await GET(GETDATAFARM);
  //     if (res) {
  //       setFarms(res);
  //     } else {
  //       setFarms([]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //แสดงข้อมูลตลอด
  useEffect(() => {
    GetDataFarm();
  }, []);

  const keyword = searchfarms.trim().toLowerCase();

  // ค้นหา
  const filteredFarms = dataFarms.filter(
    (farms) => {
      // filter ค้นหา
      const matchSearch =
        // farms.farmName
        // .toLowerCase()
        // .includes(searchfarms.trim().toLowerCase());
        farms.farm_name.toLowerCase().includes(keyword) || //ชื่อฟาร์ม
        farms.crop.toLowerCase().includes(keyword) || //ชื่อพืช
        String(farms.areaSize).includes(keyword) || //พื้นที่
        String(farms.sensorCount).includes(keyword) || //จํานวนเซนเซอร์
        String(farms.deviceCount).includes(keyword); //จํานวนอุปกรณ์

      // filter พืช
      const matchPlant = selectedPlant ? farms.crop === selectedPlant : true;

      return matchSearch && matchPlant;
    },
    // farms.farmName.toLowerCase().includes(searchfarms.trim().toLowerCase()),
  );
  const isNotFound = searchfarms && filteredFarms.length === 0;

  const plantList = [...new Set(dataFarms.map((f) => f.crop))];

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="ค้นหาฟาร์ม"
        value={searchfarms}
        onChange={(e) => setSearchFarms(e.target.value)}
      ></TextField>
      <Box mt={2}>
        <Typography>จัดการฟาร์ม</Typography>
        {isNotFound && (
          <Typography color="error" mt={1}>
            ข้อมูลไม่ถูก โปรดกรอกชื่อฟาร์ม
          </Typography>
        )}
      </Box>

      <FormControl sx={{ width: "100%", mt: 2 }}>
        <InputLabel>เลือกพืช</InputLabel>

        <Select
          value={selectedPlant}
          label="เลือกพืช"
          onChange={(e) => setSelectedPlant(e.target.value)}
        >
          {/* ตัวเลือกทั้งหมด */}
          <MenuItem value="">ทั้งหมด</MenuItem>

          {/* loop จาก plantList */}
          {plantList.map((plant) => (
            <MenuItem key={plant} value={plant}>
              {plant}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormFarms handleEditFarms={handleEditFarms} dataFarms={filteredFarms} />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex" }}>
            <Typography>แก้ไขฟาร์ม</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="ชื่อฟาร์ม"
                  name="farm_name"
                  fullWidth
                  value={dataFarmsDialog.farm_name || ""}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="พิกัด (lat,lng)"
                  fullWidth
                  value={`${dataFarmsDialog.location?.lat},${dataFarmsDialog.location?.lng}`}
                  onChange={(e) => {
                    const [lat, lng] = e.target.value.split(",");

                    setDataFarmsDialog((prev) => ({
                      ...prev,
                      location: {
                        lat: parseFloat(lat) || 0,
                        lng: parseFloat(lng) || 0,
                      },
                    }));
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="พืช"
                  name="crop"
                  fullWidth
                  value={dataFarmsDialog.crop || ""}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="ขนาดพื้นที่"
                  name="areaSize"
                  fullWidth
                  value={dataFarmsDialog.areaSize || ""}
                  onChange={handleChange}
                />
              </Grid>

              {/* ครึ่งบล็อก */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="เซ็นเซอร์"
                  name="sensorCount"
                  fullWidth
                  value={dataFarmsDialog.sensorCount || 0}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="อุปกรณ์"
                  name="deviceCount"
                  fullWidth
                  value={dataFarmsDialog.deviceCount || 0}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                onClick={() => handleSumit(dataFarmsDialog)}
                variant="outlined"
                href="#outlined-buttons"
              >
                บันทึก
              </Button>

              <Button
                onClick={handleCloseDialog}
                variant="outlined"
                color="error"
              >
                ยกเลิก
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditFarms;
