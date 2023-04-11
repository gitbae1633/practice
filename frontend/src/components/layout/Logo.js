import { Box, Typography } from '@mui/material';
import React from 'react';

const Logo = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Typography
                sx={{
                    fontSize: '40px',
                    color: '#000',
                    fontFamily: 'Black Han Sans, sans-serif',
                }}>
                Amaranth</Typography>
            <Typography
                sx={{
                    fontSize: '40px',
                    color: '#117AEF',
                    fontFamily: 'Black Han Sans, sans-serif'
                }}>10</Typography>

        </Box>
    );
};

export default Logo;