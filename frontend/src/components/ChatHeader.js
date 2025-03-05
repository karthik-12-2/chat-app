import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { setWhichIsClicked } from "../slices/userslice/UserSlice";

const ChatHeader = ({ username, status, groupMembers }) => {
  const dispatch = useDispatch();

  const handleClick = (which) => () => {
    dispatch(setWhichIsClicked(which));
  };
  
  return (
    <Box
      className="bg-white ps-3 pe-3 pt-2 pb-2 rounded-4 ms-0 mb-3"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Avatar and user info */}
      <Box display="flex" alignItems="center">
        <Avatar sx={{ width: 40, height: 40, backgroundColor: "red" }} />
        <Box className="ms-3 pt-1">
          <Typography variant="body1">{username}</Typography>
          <Typography variant="body2" color="success.main">
            {status}
          </Typography>
          <Typography
            variant="body2"
            color="success.main"
            display="flex"
            gap="4px"
          >
            {groupMembers?.map((gm) => gm.userName).join(", ")}
          </Typography>
        </Box>
      </Box>

      {/* Icon buttons */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <PhoneIcon onClick={handleClick("phone")} sx={{ cursor: "pointer" }} />
        <VideocamIcon
          onClick={handleClick("video")}
          sx={{ cursor: "pointer" }}
        />
        <MoreVertIcon
          onClick={handleClick("more")}
          sx={{ cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default ChatHeader;
