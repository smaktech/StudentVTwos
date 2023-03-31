import React from 'react';
import { Box, Card, CardHeader, Grid } from '@mui/material';
import ColumnChart from './ColumnChart';
import { AnalyticsSplineAreaChart, AnalyticsRedialbarsChart, AnalyticsCurrentSubject, AnalyticsDistributedColumnsChart, AnalyticsBasicLineChart } from '../../sections/@dashboard/general/analytics';
import SpiderChart from './SpiderChart';
import DistributedColumnChart from './DistributedColumnChart';
import BasicLineChart from './BasicLineChart';
import DonutChart from './DonutChart';

export default function Subject() {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <SpiderChart />
            </Grid>
            <Grid item xs={12} md={6}>
                <DonutChart />
            </Grid>
            <Grid item xs={12} md={6}>
                <DistributedColumnChart />
            </Grid>
            <Grid item xs={12} md={6}>
                <BasicLineChart />
            </Grid>
        </Grid>
    );
};