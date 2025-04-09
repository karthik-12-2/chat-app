import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./pages/404/ErrorPage";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

function App() {
  const { isLoggedin } = useSelector((state) => state.user);
  return (
      <Box className={`row m-0 p-1 bg-black `}>
        {/* Nabar */}
        <Box className={`col-2 col-sm-1 p-0 pe-1 `}>
          <NavBar />
        </Box>

        {isLoggedin && (
          <Box className="col-2 col-md-4 col-lg-3 p-0">
            <SideBar />
          </Box>
        )}

        {/* Main Content */}
        <Box className={`col-7 col-xs-8 ps-1 p-0`}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        </Box>

        <Toaster />
      </Box>
  );
}

export default App;
