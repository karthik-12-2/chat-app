import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../slices/userslice/UserSlice";
import Loading from "../components/Loading";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isRegistered } = useSelector(
    (state) => state.user
  );
  
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [showPassword, setshowPassword] = useState(false);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userName) return toast.error("Full name is required");
    if (!formData.email) return toast.error("Email address is required");
    if (!formData.password) return toast.error("Password is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Please enter correct email address");
    if (formData.password.length < 6)
      return toast.error("Password must be 6 letters");

    dispatch(signup(formData));
  }

  return (
    <div className="row d-flex align-items-center justify-content-center mx-0 mt-5">
      <div className="col-xl-3 col-lg-5 col-md-6 col-12">
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <Typography variant="h4" component="h1" gutterBottom>
            Sign up
          </Typography>
          <form
            className="d-flex flex-column col-12 position-relative"
            onSubmit={handleSubmit}
          >
            <TextField
              label="UserName"
              type="text"
              variant="outlined"
              margin="normal"
              name="userName"
              onChange={(e) => handleFormData(e)}
            />
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
                top: "55%",
                right: "0px",
              }}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </Button>
            <p className="mt-2 mb-3 d-flex justify-content-center">
              Already have an account?{" "}
              <Link to="/login">
                <strong>Login</strong>
              </Link>
            </p>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100px", alignSelf: "center" }}
              disabled={loading}
            >
              {loading ? <Loading /> : "Sign up"}
            </Button>
          </form>
          {isRegistered && navigate("/login")}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
