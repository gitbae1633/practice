import { Button, FormControl, TextField, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SerchBar = ({ callback }) => {
  const [searchKw, setSearchKw] = useState({ pkeywd: "", psize: "" });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    //callback(searchKw);
    return () => {};
  }, [searchKw]);

  return (
    <Box>
      <span
        style={{
          borderBottom: "2px solid black",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        검색창
      </span>
      <FormControl
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          callback(searchKw);
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "space-between",
            alignItems: "center",
          }}
        >
          <label>검색어</label>
          <TextField
            type="text"
            name="pkeywd"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 7 }}
          />
          <label>규격</label>
          <TextField
            type="text"
            name="psize"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2 }}
          />
        </Box>
        <Button type="submit" variant="outlined" sx={{ marginRight: 10 }}>
          <SearchIcon />
        </Button>
      </FormControl>
    </Box>
  );
};

export default SerchBar;
