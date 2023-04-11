import { FormControl, TextField, Button, Box } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import React, { useRef, useState } from 'react'

function Search({textHandleChanges}) {
  const refForm = useRef(null);
  return (
    <Box>
      <span style={{
        borderBottom: '2px solid black',
        fontSize: '20px',
        fontWeight: 600
      }}>검색창</span>
      
      <FormControl 
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 3
            }}
            name='searchForm'
            component='form' 
            ref={refForm}
            onSubmit={e => {
              e.preventDefault();
              textHandleChanges(e);  // clear 하기
              refForm.current.reset();
            }}>
            <Box sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
              <label htmlFor='bid'>검색어</label>
              <TextField 
                id="bid" 
                name="code" 
                type="text" 
                size="small" 
                sx={{marginLeft: 2, marginRight: 7}} />

              <label htmlFor='bphone'>번호</label>
              <TextField id="bphone" name="phone" type="text" variant="outlined" 
                size="small"
                sx={{marginLeft: 2, marginRight: 7}} />
            </Box>
            <Button type="submit" name='submit' variant="outlined"
                    sx={{marginRight: 10}}>
              <SearchIcon />
            </Button>
      </FormControl>
        
    </Box>
  )
}

export default Search