import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./hooks/PrivateRoute";
import CustomDrewer from "./layouts/CustomDrewer";
import EditFarms from "./pages/EditFarms";
import EditProducts from "./pages/EditProducts";
import EditUsers from "./pages/EditUsers";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboards from "./pages/DashBoards";
import TestButton from "./test/TestButton";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/login", Component: Login },

      {
        Component: PrivateRoute, // ครอบก่อน
        children: [
          {
            Component: CustomDrewer, // layout
            children: [
              { path: "/", Component: Dashboards },
              { path: "/editusers", Component: EditUsers },
              { path: "/editfarms", Component: EditFarms },
              { path: "/editproducts", Component: EditProducts },
              { path: "/profile", Component: Profile },
              { path: "/test", Component: TestButton },
            ],
          },
        ],
      },
    ],
  },
]);

//   { index: true, Component: Home },
//   { path: "about", Component: About },
//   {
//     path: "auth",
//     Component: AuthLayout,
//     children: [
//       { path: "login", Component: Login },
//       { path: "register", Component: Register },
//     ],
//   },
//   {
//     path: "concerts",
//     children: [
//       { index: true, Component: ConcertsHome },
//       { path: ":city", Component: ConcertsCity },
//       { path: "trending", Component: ConcertsTrending },
//     ],
//   },
//     ],
//   },
// ]);

export default router;
