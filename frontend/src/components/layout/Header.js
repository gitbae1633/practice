import { Box, Button, Toolbar } from "@mui/material";
import React from "react";
// import styles from "../../assets/scss/Header.scss";
import Douzone from "./Douzone";
import Logo from "./Logo";
const Header = () => {
  const logoutHandler = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "get",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      position="absolute"
      sx={{
        zIndex: "tooltip",
        backgroundColor: "white",
        width: "100%",
        m: 0,
        p: 0
      }}
    >
      <Toolbar position="fixed">
        <Box
          variant="h6"
          component="div"
          sx={{
            display: "flex",
            margin: '20px',
            width: '100%',
            height: '80px',
            textAlign: 'center',
            lineHeight: '80px'           
          }}
        >
          <Box
            sx={{
              display: 'block',
              float: 'left'
            }}>
            <a href="/" style={{ textDecoration: "none" }}>
              {/* <span id={styles.amaranth}>Amaranth</span>
              <span id={styles.logoNumber}>10</span> */}
              <Logo />
            </a>
            {/* <Douzone /> */}

          </Box>
          <Button onClick={logoutHandler}>logout</Button>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
