import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import SunnyIcon from "@mui/icons-material/Sunny";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

function FormFarms({ dataFarms, handleEditFarms }) {
  // console.log("datafarms:", datafarms);

  // [
  // {0: name, 1: location, 2: crop, 3: areaSize},
  // {1: name, 1: location, 2: crop, 3: areaSize}
  // {2: name, 1: location, 2: crop, 3: areaSize}
  // ]

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {dataFarms.map((dataFarms) => (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ border: "1px solid #ecfdf5", p: 2 }}>
              <Box>
                <Typography>
                  <SunnyIcon sx={{ fontSize: 18, mr: 1 }} /> ชื่อ:
                  {dataFarms.farm_name}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  พิกัด: {dataFarms.location.lat}, {dataFarms.location.lng}
                </Typography>
              </Box>
              <Box>
                <Typography>พืช: {dataFarms.crop}</Typography>
              </Box>
              <Box>
                <Typography>ขนาดพื้นที่: {dataFarms.areaSize}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>เซ็นเซอร์: {dataFarms.sensorCount}</Typography>
                <Typography>อุปกรณ์: {dataFarms.deviceCount}</Typography>
              </Box>
              <Divider />
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>
                    <WbSunnyOutlinedIcon sx={{ fontSize: 18, mr: 1 }} />
                    แสงแดด: {dataFarms.environment.sunlight}
                  </Typography>
                  <Typography>
                    <DeviceThermostatIcon sx={{ fontSize: 18 }} /> อุณหภูมิ:{" "}
                    {dataFarms.environment.temperature}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>
                    ความชื้น: {dataFarms.environment.humidity}
                  </Typography>
                  <Typography>
                    <WaterDropOutlinedIcon sx={{ fontSize: 18 }} /> น้ำ:{" "}
                    {dataFarms.environment.waterLevel}
                  </Typography>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", mt: 2 }}>
                  <Button
                    sx={{ backgroundColor: "primary.main", color: "white" }}
                    onClick={() => handleEditFarms(dataFarms)}
                  >
                    แก้ไข
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FormFarms;
