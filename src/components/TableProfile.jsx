import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

function TableProfile({ handleEditProfile, dataProfile }) {
  // ดึงข้อมูล profile มาไว้ที่ตัวแปรเดียว ป้องกัน Error หาก dataProfile ยังไม่โหลด
  const profile = dataProfile?.[0] || {};
  const fullName =
    `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      {/* --- Section 1: ข้อมูลสรุปโปรไฟล์ --- */}
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardHeader
          title="โปรไฟล์แอดมิน"
          titleTypographyProps={{ variant: "h6" }}
          avatar={<Person2OutlinedIcon color="primary" />}
          action={
            <Button
              variant="contained"
              startIcon={<EditOutlinedIcon />}
              onClick={() => handleEditProfile(profile)}
              sx={{
                borderRadius: 1.5,
                textTransform: "none",
                mt: 1,
                mr: 1,
                color: "#fff",
              }}>
              แก้ไขโปรไฟล์
            </Button>
          }
          sx={{
            bgcolor: "#f8f9fa",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems="center">
            <Avatar
              sx={{
                width: 90,
                height: 90,
                fontSize: 36,
                bgcolor: "primary.main",
              }}>
              {(profile.firstName?.charAt(0) || "") +
                (profile.lastName?.charAt(0) || "")}
            </Avatar>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h5">{fullName || "ไม่ระบุชื่อ"}</Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 0.5 }}>
                บทบาท: {profile.role || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ที่อยู่: {profile.address || "-"}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* --- Section 2: ตารางข้อมูลรายละเอียด --- */}
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table size="medium">
            <TableBody>
              {[
                { label: "ชื่อ-นามสกุล:", value: fullName },
                { label: "เพศ:", value: profile.gender },
                { label: "เบอร์โทรศัพท์:", value: profile.phone },
                { label: "อีเมล:", value: profile.email },
                { label: "วันที่สมัคร:", value: profile.registerDate },
                { label: "วันที่ใช้งานล่าสุด:", value: profile.lastActive },
              ].map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      width: { xs: "40%", sm: "30%" },
                      bgcolor: "#f8f9fa",
                      color: "text.secondary",
                      borderRight: "1px solid",
                      borderColor: "divider",
                    }}>
                    {row.label}
                  </TableCell>
                  <TableCell>{row.value || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* --- Section 3: การจัดการฐานข้อมูล --- */}
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardHeader
          title="ฐานข้อมูล"
          titleTypographyProps={{ variant: "h6" }}
          avatar={<FolderOutlinedIcon sx={{ color: "#00a67e" }} />}
          sx={{
            bgcolor: "#f8f9fa",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <CardContent>
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f8f9fa",
                p: 2,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}>
              <Box>
                <Typography variant="body1">Auto Backup</Typography>
                <Typography variant="caption" color="text.secondary">
                  สำรองข้อมูลทุกวัน เวลา 02:00 น.
                </Typography>
              </Box>
              <Switch defaultChecked color="primary" />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
              }}>
              <Button
                variant="contained"
                startIcon={<FileDownloadOutlinedIcon />}
                sx={{
                  background: "#10b981",
                  color: "#fff",
                  "&:hover": { background: "#059669" },
                  borderRadius: 1.5,
                  textTransform: "none",
                  px: 3,
                }}>
                ดาวน์โหลดสำรอง
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default TableProfile;
