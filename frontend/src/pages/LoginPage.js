import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userslice/UserSlice";
import Loading from "../components/Loading";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isLoggedin } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setshowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedin) navigate("/");
  }, [isLoggedin, navigate]);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return toast.error("Email address is required");
    if (!formData.password) return toast.error("Password is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Please enter a valid email address");
    if (formData.password.length < 6)
      return toast.error("Password must be 6 letters");

    dispatch(login(formData));
  };

  return (
    <div className="row d-flex align-items-center justify-content-center mt-5 mx-0">
      <div className="col-xl-3 col-lg-5 col-md-6 col-12">
        <div
          className="d-flex flex-column align-items-center justify-content-center mt-5"
          style={{ marginBlockStart: "100px" }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign in
          </Typography>
          <form
            className="d-flex flex-column col-12 position-relative"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              onChange={(e) => handleFormData(e)}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="dense"
              name="password"
              placeholder="......"
              onChange={(e) => handleFormData(e)}
              value={formData.password}
            />
            <Button
              onClick={() => setshowPassword(!showPassword)}
              variant="text"
              color="secondary"
              sx={{
                width: "0px",
                padding: "0px",
                background: "none",
                position: "absolute",
                top: "40%",
                right: "0px",
              }}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </Button>
            <p className="mt-2 mb-3 d-flex justify-content-center">
              Don't have an account?{" "}
              <Link to="/signup">
                <strong> Sign up </strong>
              </Link>
            </p>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100px", alignSelf: "center" }}
              disabled={loading}
            >
              {loading ? <Loading /> : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
