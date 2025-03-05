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
      <div
              style={{
                height: "40px",
                width: "auto",
                backgroundColor: "whitesmoke",
                display: "flex",
                justifyContent: "space-between",
                padding: "5px",
                paddingInline: "5px",
                borderRadius: "25px",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              {" "}
              <button
                style={{
                  height: "30px",
                  color: "blue",
                  borderRadius: "15px",
                  backgroundColor: "lightgreen",
                  width: "20%",
                  paddingTop: "2px",
                  paddingLeft: "6px",
                  border: "none",
                  position: "relative",
                }}
              >
                All
              </button>
              <button
                style={{
                  height: "30px",
                  color: "blue",
                  borderRadius: "15px",
                  backgroundColor:
                    "whitesmoke",
                  width: "30%",
                  paddingTop: "2px",
                  paddingLeft: "6px",
                  border: "none",
                }}
              >
                Personals
              </button>
              <button
                style={{
                  height: "30px",
                  color: "blue",
                  borderRadius: "15px",
                  backgroundColor:"whitesmoke",
                  width: "20%",
                  paddingTop: "2px",
                  paddingLeft: "6px",
                  border: "none",
                }}
                
              >
                Group
              </button>
            </div>
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
