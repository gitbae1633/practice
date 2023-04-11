import * as React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
import Navigation from "./Navigation";
import Container from "./Container";

const SiteLayout = ({ role, children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      {
        role === 'admin' ? null : <Navigation />
      }
      <Container>{children}</Container>
    </Box>
  );
};

export default SiteLayout;
