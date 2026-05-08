import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuIcon from "@mui/icons-material/Menu";
import SpaOutlineIcon from "@mui/icons-material/SpaOutlined";
import { Avatar, Button, Grid, ListItemIcon } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MenuNav } from "../utils/Static";

function CustomDrewer() {
  // ==== Navbar 1 ====
  const pathactive = window.location.pathname;
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // ประกาศตัวแปรเพื่อดู URL ปัจจุบัน
  const location = useLocation();
  // หาว่า path ปัจจุบันตรงกับ item ไหนใน MenuNav
  const currentPage = MenuNav.find((item) => item.path === location.pathname);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ==== Navbar 2 ====
  const [mobileOpen, setMobileOpen] = useState(false); // Desktop(false) or mobile(true)
  const [isClosing, setIsClosing] = useState(false);
  const drawerWidth = 240;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  const navigate = useNavigate();

  const handleEditProfile = () => {
    handleClose();
    navigate("/profile");
  };
  // ==== Deawer and LOGO ====
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
        }}
        component="a"
        href="/">
        <SpaOutlineIcon sx={{ fontSize: 30, color: "#10B981", mr: 1 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "black",
            color: "#10B981",
          }}>
          Smart Farm
        </Typography>
      </Button>

      <List>
        {MenuNav.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton
              selected={pathactive === item.path}
              component="a"
              href={item.path}
              sx={{
                borderRadius: "8px",
                margin: "0 8px",
                transition: "0.2s",

                // สถานะปกติ (ยังไม่เลือก)
                color: "#6b7280",
                "& .MuiListItemIcon-root": { color: "#6b7280" },

                // เมื่อถูกเลือก (Selected)
                "&.Mui-selected": {
                  backgroundColor: "#10b981",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },

                // ตอน Hover (ทั่วไป - ยังไม่เลือก)
                "&:hover": {
                  backgroundColor: "#ecfdf5",
                  color: "#10b981",
                  "& .MuiListItemIcon-root": { color: "#10b981" },
                },

                // เมื่อเลือกอยู่แล้ว Hover
                "&.Mui-selected:hover": {
                  backgroundColor: "#059669",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },
              }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List sx={{ mt: "auto" }}>
        <Box>
          <Typography sx={{ flex: "auto" }}>
            <MenuItem
              onClick={handleLogout}
              sx={{
                borderRadius: "8px",
                margin: "0 8px",
                transition: "0.2s",
                p: 2,
                transition: "0.3s",
                backgroundColor: "#fff2f2",
                color: "#ffafaf",
                "&:hover": {
                  backgroundColor: "#f87171",
                  color: "white",
                },
              }}>
              ออกจากระบบ
            </MenuItem>
          </Typography>
        </Box>
      </List>
    </Box>
  );

  return (
    //
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{ root: { keepMounted: true } }}>
          {drawer}
        </Drawer>

        {/*SideBar Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content and Navbar*/}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>

            {/* แสดง ชื่อหน้า*/}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}>
              {currentPage ? currentPage.name : "หน้าหลัก"}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="default">
                  <AccountCircle />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                  }}
                  keepMounted
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <MenuItem onClick={handleEditProfile}>
                    <Grid container spacing={2} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32 }} />
                      โปรไฟล์ของฉัน
                    </Grid>
                  </MenuItem>
                  {/* <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem> */}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <Box sx={{ flex: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default CustomDrewer;

// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Box } from "@mui/material";

// function CustomDrewer() {
//   return (
//     <div>
//       <Box sx={{ border: "1px solid #0000ff", display: "flex", flexDirection: { xs: "column", md: "row" } }}>Navbar</Box>

//       <Box sx={{ border: "1px solid #ff00ff", display: "flex" }}>
//         <Box sx={{ border: "1px solid #00ff51" }}>
//           <div>SideBar</div>
//           <div>SideBar</div>
//           <div>SideBar</div>
//           <div>SideBar</div>
//         </Box>
//         <Box sx={{ border: "1px solid #ff0019", flex: "auto" }}>
//           <Outlet />
//         </Box>
//       </Box>
//     </div>
//   );
// }
