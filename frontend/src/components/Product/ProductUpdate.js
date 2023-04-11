import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ProductUpdate({
  itemUpdateHandler,
  productDetail,
  item,
  setItem,
}) {
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(productDetail.code);

    setItem({
      code: productDetail.code,
      name: productDetail.name,
      size: productDetail.size,
      unit: productDetail.unit,
    });
    return () => {};
  }, [productDetail]);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setItem({ ...item, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    itemUpdateHandler(item, target);
  };
  return (
    <Box
      boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      sx={{
        padding: 3,
      }}
    >
      <span
        style={{
          borderBottom: "2px solid black",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        세부사항
      </span>
      <FormControl
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          marginTop: 3,
        }}
      >
        <Typography>품번</Typography>
        <TextField
          type="text"
          name="code"
          size="small"
          value={item.code || ""}
          onChange={changeHandler}
        />
        <Typography sx={{ marginTop: 2 }}>품명</Typography>
        <TextField
          type="text"
          name="name"
          value={item.name || ""}
          onChange={changeHandler}
          size="small"
        />
        <Typography sx={{ marginTop: 2 }}>규격</Typography>
        <TextField
          type="text"
          name="size"
          value={item.size || ""}
          onChange={changeHandler}
          size="small"
        />
        <Typography sx={{ marginTop: 2 }}>단위</Typography>
        <TextField
          type="text"
          name="unit"
          value={item.unit || ""}
          onChange={changeHandler}
          size="small"
        />
        <Button type="submit" variant="outlined" sx={{ marginTop: 2 }}>
          등록
        </Button>
      </FormControl>
    </Box>
  );
}
