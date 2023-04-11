import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import Error404 from "../components/error/Error404";
import Registerister from "../components/user/Register";
import Main from "../components/Main";
import SiteLayout from "../components/layout/SiteLayout";
import Product from "../components/Product/Product";
import Business from "../components/Business/Business";

const AdminRoute = ({role}) => {
  const layout = (children) => <SiteLayout role={role}>{children}</SiteLayout>;
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/" element={<Main role={role} />} />
          <Route path="/register" element={layout(<Registerister />)} />
          <Route path="/product" element={layout(<Product />)} />
          <Route path="/business" element={layout(<Business />)} />
          <Route path="*" element={layout(<Error404 />)} />
        </Routes>
      </Router>
    </Box>
  );
};

export default AdminRoute;
