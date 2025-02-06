import { Avatar, Box, Skeleton } from "@mui/material";
import React from "react";

const ChatHeaderSkeleton = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="row" sx={{paddingBottom: '6px'}}>
      <Avatar sx={{ width: 40, height: 40 }}>
        <Skeleton variant="circular" width={40} height={40} />
      </Avatar>

      <Box sx={{ ml: 2 }}>
        <Skeleton variant="text" width={120} height={30} />
        <Skeleton variant="text" width={100} height={25} />
      </Box>
    </Box>
  );
};

export default ChatHeaderSkeleton;
