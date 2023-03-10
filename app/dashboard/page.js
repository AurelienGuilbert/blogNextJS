"use client";

import React from "react";
import IsAdmin from "../../config/security/IsAdmin";

const Dashboard = () => {
  return (
    <IsAdmin>
      <h1 className="d-flex justify-content-center mt-5">Dashboard</h1>
    </IsAdmin>
  )
};

export default Dashboard;