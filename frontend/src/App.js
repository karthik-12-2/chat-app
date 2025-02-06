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

function App() {
  const {isLoggedin} = useSelector((state) => state.user)
  return (
    <div className={`row m-0 p-1 ${isLoggedin ? 'bg-danger bg-opacity-25' : ''}`} >
      <NavBar />
      {true && <SideBar/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
