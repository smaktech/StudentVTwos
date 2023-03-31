import React from 'react';
import { Box, Card, CardHeader, Grid } from '@mui/material';
import DonutChart from './DonutChart';
import ColumnChart from './ColumnChart';
import { AnalyticsSplineAreaChart, AnalyticsRedialbarsChart } from '../../sections/@dashboard/general/analytics';
import SplineAreaChart from './SplineAreaChart';
import RedialbarsChart from './RedialbarsChart';

export default function Overview() {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <DonutChart />
            </Grid>
            <Grid item xs={12} md={6}>
                <ColumnChart />
            </Grid>
            <Grid item xs={12} md={6}>
                <SplineAreaChart />
            </Grid>
            <Grid item xs={12} md={6}>
                <RedialbarsChart />
            </Grid>
        </Grid>
    );
};