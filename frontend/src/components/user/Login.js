import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
const Login = ({ handleLogin }) => {
  const [userList, setUserList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser();
  };

  // user login
  const loginUser = async () => {
    const data = {
      id: document.getElementById("id").value,
      password: sha256(document.getElementById("password").value),
    };

    console.log(data);

    try {
      const response = await fetch("/api/user/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }

      console.log(json.data);

      if (json.data === null) {
        console.log("login failed....");
        alert("login failed....");
        return;
      }

      console.log("login success!!!!!");
      alert("login success!!!!!");
      handleLogin(json.data);

    } catch (err) {
      console.log(err.message);
    }
  };
  // user 목록 출력
  const printList = async () => {
    try {
      const response = await fetch("/api/user", {
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
      setUserList([...userList, ...json.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    printList();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        p : 2,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <FormControl
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          marginTop:1
        }}>
        <TextField
          id="id"
          label="id"
          name="id"
          type="text"
          variant="outlined"
          size='small'
          sx={{
            marginTop:1
          }}
        />
        <TextField
          id="password"
          label="password"
          name="password"
          type="password"
          variant="outlined"
          size='small'
          sx={{
            marginTop:2
          }}
        />

        <Button 
          type="submit" 
          variant="outlined"
          sx={{
            marginTop:3,
            ":hover": {
              backgroundColor: '#117AEF',
              color: '#fff'
            }
          }}>
          <strong>Login</strong>
        </Button>
      </FormControl>

    </Box>
  );
};

export default Login;
