import React from "react";
import { Avatar, Box, Divider, Skeleton } from "@mui/material";

const SideBarSkeleton = () => {
  const users = new Array(7).fill(null);
  return (
    <Box display='flex' flexDirection='column'>
      <Box  display="flex" alignItems="center" flexDirection='row' sx={{marginBottom: '10px'}}>
          <Avatar sx={{ width: 60, height: 60 }}>
            <Skeleton variant="circular" width={60} height={60} />
          </Avatar>

          <Box sx={{ ml: 2 }}>
            <Skeleton variant="text" width={120} height={30} />
            <Skeleton variant="text" width={100} height={25} />
          </Box>
      </Box>
      <Divider sx={{marginBottom: '10px'}}/>
      {users.map((_, i) => (
        <Box display="flex" alignItems="center" key={i} flexDirection='row' sx={{marginBottom: '12px'}}>
          <Avatar sx={{ width: 60, height: 60 }}>
            <Skeleton variant="circular" width={60} height={60} />
          </Avatar>

          <Box sx={{ ml: 2 }}>
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={250} height={25} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SideBarSkeleton;
