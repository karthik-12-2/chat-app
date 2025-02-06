import React from "react";
import SyncIcon from "@mui/icons-material/Sync";

const LoadingCenter = () => {
  return (
    <>
      <center className="d-flex justify-content-center align-items-center" style={{height: '70vh'}} ><SyncIcon sx={{ animation: "spin 1s linear infinite",  fontSize: '35px'}} /></center>
      <style>
        {`@keyframes spin {
            100%{
            transform: rotate(360deg);
            }
         }`}
      </style>
    </>
  );
};

export default LoadingCenter;
