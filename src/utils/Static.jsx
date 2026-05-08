import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";

export const MenuNav = [
  { name: "Dashboard", icon: <DashboardCustomizeOutlinedIcon />, path: "/" },
  {
    name: "EditUsers",
    icon: <ManageAccountsOutlinedIcon />,
    path: "/editusers",
  },
  { name: "EditFarms", icon: <AgricultureOutlinedIcon />, path: "/editfarms" },
  {
    name: "EditProducts",
    icon: <Inventory2OutlinedIcon />,
    path: "/editproducts",
  },
  { name: "Profile", icon: <PortraitOutlinedIcon />, path: "/profile" },
];

export const TableDashBorad = [
  { id: 1, align: "left", label: "userId", value: "userId" },
  { id: 2, align: "right", label: "id", value: "id" },
  { id: 3, align: "left", label: "title", value: "title" },
  { id: 4, align: "left", label: "body", value: "body" },
];

export const TableEditUser = [
  { id: 1, align: "left", label: "name", value: "username" },
  { id: 2, align: "left", label: "lastname", value: "lastname" },
  { id: 3, align: "left", label: "email", value: "email" },
  { id: 4, align: "left", label: "phone", value: "phone" },
  { id: 5, align: "left", label: "zone", value: "zone" },
  { id: 6, align: "left", label: "Role", value: "role" },
];

export const TableEditProducts = [
  { id: 0, align: "left", label: "No.", value: "no" },
  { id: 1, align: "left", label: "palantName", value: "name" },
  { id: 2, align: "right", label: "quantuty", value: "lastname" },
  { id: 3, align: "left", label: "rai", value: "email" },
];

export const TableEditFarms = [
  { id: 1, align: "left", label: "userId", value: "userId" },
  { id: 2, align: "right", label: "id", value: "id" },
  { id: 3, align: "left", label: "title", value: "title" },
  { id: 4, align: "left", label: "body", value: "body" },
  { id: 5, align: "center", label: "action", value: "action" },
];
