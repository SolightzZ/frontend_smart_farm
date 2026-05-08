import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { LOGIN, POST } from "../services/Api";

function Login() {
  const theme = useTheme();
  const ismobile = theme.breakpoints.down("md");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      Swal.fire({
        title: "Error!",
        text: "Please enter username and password",
        icon: "error",
      }).then(() => {
        return;
      });
    }
    handleLogin();
  };

  const handleLogin = async () => {
    const res = await POST(LOGIN, {
      username,
      password,
    });
    try {
      if (res.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: res.username,
            admin_id: res.password,
          }),
        );

        localStorage.setItem("token", res.token);
        window.location.href = "/";
      } else {
        Swal.fire({
          title: "Warning!",
          text: res.message,
          icon: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };
  const user = localStorage.getItem("user");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (user && isLoggedIn) {
    window.location.href = "/";
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}>
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#DDF5ED",
        }}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
          }}>
          <SpaOutlinedIcon sx={{ fontSize: 50, color: "#10B981", mr: 1 }} />
          Smart Farm
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          sx={{
            m: 2,
            p: 2,
            height: "50%",
            width: "80%",
            margin: "auto",
            marginTop: "25%",
          }}>
          <Typography
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
              fontSize: 40,
            }}>
            <SpaOutlinedIcon sx={{ fontSize: 50, color: "#10B981", mr: 1 }} />
            Smart Farm
          </Typography>
          <Typography variant="h5" align="left" sx={{ mt: 4, fontSize: 30 }}>
            เข้าสู่ระบบ
          </Typography>
          <Typography variant="body2" align="left" sx={{ mt: 1 }}>
            กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ
          </Typography>
          <Typography variant="body2" align="left" sx={{ mt: 4 }}>
            ชื่อผู้ใช้
          </Typography>

          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          />
          <Typography variant="body2" align="left" sx={{ mt: 4 }}>
            รหัสผ่าน
          </Typography>

          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          />

          <Button
            fullWidth
            sx={{
              mt: 4,
              height: 40,
              backgroundColor: "#007bff",
              color: "#fff",
            }}
            onClick={() => {
              handleSubmit();
            }}>
            เข้าสู่ระบบ
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
