import { Box } from "@mui/material";
import React from "react";

const Container = ({ children }) => {
  return (
    <Box>
      <Box
        component="main"
        sx={{
          position: "absolute",
          p: 8,
          width: "80%",
          height: "600px",
          backgroundColor: "white",
          marginTop: "120px",
          marginLeft: "200px",
          maxWidth: "1200px",
          border: "4px solid #117AEF",
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Container;
