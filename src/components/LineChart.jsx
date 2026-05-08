import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  Grid, // รองรับ MUI v6 หรือ Grid2
  Paper,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ScienceIcon from "@mui/icons-material/Science";
import { useEffect, useMemo, useState } from "react";
import { DASHBOARD, GET } from "../services/Api";

// ตั้งค่า Options สำหรับ Chart.js เพื่อให้ Responsive
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "สถิติสภาพแวดล้อมฟาร์ม",
    },
  },
};

function DashboardStatistics() {
  const [dataDashBoards, setDataDashBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //Loading State

  const getAverage = (arr) => {
    const numbers = arr
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));

    if (!numbers.length) return 0;
    return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
  };

  const avgTemp = getAverage(dataDashBoards?.map((item) => item.temperatures));
  const avgHumidity = getAverage(dataDashBoards?.map((item) => item.humidity));
  const avgPh = getAverage(dataDashBoards?.map((item) => item.ph));

  const chartData = useMemo(
    () => ({
      labels: dataDashBoards?.map((item) => item.farm_name || "ไม่ระบุชื่อ"),
      datasets: [
        {
          label: "อุณหภูมิ (°C)",
          data: dataDashBoards?.map((item) => item.temperatures),
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          borderRadius: 4,
        },
        {
          label: "ความชื้น (%)",
          data: dataDashBoards.map((item) => item.humidity),
          backgroundColor: "rgba(53, 162, 235, 0.7)",
          borderRadius: 4,
        },
        {
          label: "ค่า pH",
          data: dataDashBoards?.map((item) => item.ph),
          backgroundColor: "rgba(255, 206, 86, 0.7)",
          borderRadius: 4,
        },
      ],
    }),
    [dataDashBoards],
  );

  const GetDataLineChart = async () => {
    setIsLoading(true);
    try {
      const res = await GET(DASHBOARD);
      console.log("DASHBOARD:", DASHBOARD);
      if (res.success) {
        setDataDashBoards(res.result);
      } else {
        setDataDashBoards([]);
      }
    } catch (error) {
      console.log(error);
      setDataDashBoards([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetDataLineChart();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {/* ส่วนที่ 1: การ์ดสรุปข้อมูลเฉลี่ย */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, borderColor: "rgba(255, 99, 132, 0.3)" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(255, 99, 132, 0.1)",
                  }}>
                  <DeviceThermostatIcon sx={{ color: "rgb(255, 99, 132)" }} />
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    อุณหภูมิเฉลี่ย
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {avgTemp.toFixed(1)} °C
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, borderColor: "rgba(53, 162, 235, 0.3)" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(53, 162, 235, 0.1)",
                  }}>
                  <WaterDropIcon sx={{ color: "rgb(53, 162, 235)" }} />
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    ความชื้นเฉลี่ย
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {avgHumidity.toFixed(1)} %
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, borderColor: "rgba(255, 206, 86, 0.5)" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(255, 206, 86, 0.1)",
                  }}>
                  <ScienceIcon sx={{ color: "rgb(204, 153, 0)" }} />
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    ค่า pH เฉลี่ย
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {avgPh.toFixed(1)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ส่วนที่ 2: กราฟแสดงข้อมูล */}
      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, height: 400 }}>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%">
                <CircularProgress />
              </Box>
            ) : dataDashBoards.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%">
                <Typography color="text.secondary">
                  ไม่มีข้อมูลสำหรับแสดงผล
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardStatistics;
