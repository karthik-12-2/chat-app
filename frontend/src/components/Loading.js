import React from "react";
import SyncIcon from "@mui/icons-material/Sync";

const Loading = () => {
  return (
    <>
      <center className="d-flex justify-content-center align-items-center"><SyncIcon sx={{ animation: "spin 1s linear infinite",  fontSize: '25px'}} /></center>
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

export default Loading;
