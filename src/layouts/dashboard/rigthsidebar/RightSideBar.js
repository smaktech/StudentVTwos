import { Box, Grid } from '@mui/material';
import React from 'react';

export default function RightSideBar() {
    return (
        <Box sx={{ width: '100%', border: '1px solid black', height: '100vh' }}>
            <Grid container spacing={0}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', border: '1px solid black' }}>component</Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', border: '1px solid black' }}>component</Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', border: '1px solid black' }}>component</Grid>
            </Grid>
        </Box>
    );
};