import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./route";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./hooks/AuthContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
