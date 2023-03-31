import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function AnalyticsDonutChart() {
    const chartOptions = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    }

    return (
        // <Card sx={{ height: '100%' }}>
        // <CardHeader title="Website Visits" subheader="(+43%) than last year" />
        // <Box sx={{ alignSelf: 'center',height: '100%' }} dir="ltr">
        <ReactApexChart type="donut" series={chartOptions.series} options={chartOptions.options} height={'100%'} width={"100%"} />
        // </Box>
        // </Card>
    );
};