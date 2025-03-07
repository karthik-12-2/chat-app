import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  invalid,
  logout,
  setUserToChatId,
} from "../slices/userslice/UserSlice";
import { useCallback, useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { setGroup } from "../slices/groupSlice/GroupSlice";

const NavBar = () => {
  const { isLoggedin, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigateToLogin = useCallback(() => navigate("/login"), [navigate]);

  // checking if the user token not validate redirect to login
  useEffect(() => {
    if (error && isLoggedin && !hasNavigated) {
      dispatch(invalid());
      setHasNavigated(true);
      navigateToLogin();
    }
  }, [error, isLoggedin, hasNavigated, dispatch, navigateToLogin]);

  const handleLogout = (e) => {
    dispatch(logout());
    navigate("/login");
    socket.emit("loggedout", currentUser);
    dispatch(setUserToChatId({ id: "", username: "" }));
    dispatch(setGroup({ id: "", groupname: "" }));
  };

  return isLoggedin ? (
    <nav
      className=" mt-1  mb-0  ps-md-0 pe-lg-0 pe-md-2 me-3 ms-3"
      style={{ width: "4%" }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          backgroundColor: "rgba(245,245,245, 0.50)",
          borderRadius: "12px",
          padding: { sm: "2" },
        }}
      >
        <ListItem>
          <ListItemButton
            component={Link}
            to={isLoggedin ? "/" : "#"}
            sx={{ paddingLeft: "3px" }}
          >
            <ListItemIcon sx={{ paddingLeft: "3px" }}>
              <WebStoriesIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <List className="bg-secondary bg-opacity-10 rounded-5 ms-0 py-0">
          {[
            <HomeOutlinedIcon />,
            <MessageOutlinedIcon />,
            <FilterTiltShiftIcon />,
            <WaterDropOutlinedIcon />,
            <SearchIcon />,
            <AddIcon />,
          ].map((icon, i, arr) => (
            <ListItem
              sx={{
                padding: "0",
                paddingBottom: i === arr.length - 1 ? "0" : "10px",
              }}
              key={i}
            >
              <ListItemButton
                sx={{ paddingBottom: "15px", borderRadius: "100%" }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <ListItem>
          <ListItemButton
            onClick={handleLogout}
            sx={{ borderRadius: "50%", background: "none", paddingLeft: "3px" }}
          >
            <ListItemIcon sx={{ padding: "3px" }}>
              <LogoutIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  ) : (
    <header
      className="bg-success bg-opacity-25 col-12 p-0"
      style={{ maxHeight: "60px" }}
    >
      <nav>
        <List
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            paddingBlock: "0",
          }}
        >
          <ListItem sx={{ width: "200px" }}>
            <ListItemButton component={Link} to={isLoggedin ? "/" : "#"}>
              <ListItemIcon>
                <WebStoriesIcon />
              </ListItemIcon>
              <ListItemText className="d-sm-block d-none">
                Chat App
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <List
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {isLoggedin && (
              <ListItem sx={{ flex: 1 }}>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText className="d-sm-block d-none">
                    Logout
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </List>
      </nav>
    </header>
  );
};

export default NavBar;
