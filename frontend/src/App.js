import React, { useState } from "react";
import "./assets/scss/index.scss";
import Login from "./components/user/Login";
import Route from "./main/Route";
import { Box } from "@mui/material";
import Logo from "./components/layout/Logo";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(user);
  };
  return ( 
    <Box
      sx={{
        width: '100%',
        height: '100%'
      }}>
      {
        !user ? 
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: '100%',
            width: '100%',
            lineHeight: '50%',
            height: '100%',
            marginTop: '240px'
          }}>
          <Logo/>
          <Login
            handleLogin={handleLogin} />
        </Box>
        : <Route role={user.role}/>
      }
    </Box>
    );
};

export default App;