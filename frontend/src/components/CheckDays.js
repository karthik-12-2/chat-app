import React from "react";

const CheckDays = ({ message }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[new Date(message).getDay()];
  return <div>{day}</div>;
};

export default CheckDays;
