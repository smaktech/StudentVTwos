import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader } from '@mui/material';

export default function AnalyticsPieChart() {
    const state = {
        series: [44, 55, 13],
        options: {
            chart: {
                width: "100%",
                type: 'pie',
            },
            labels: ['English', 'Math', 'Bio'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    }

    return (
        <Card sx={{ height: { md: '200px', lg: '300px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <CardHeader title="Performance" sx={{mb:4}}/> */}
            <ReactApexChart options={state.options} series={state.series} type='pie' width='100%' />
        </Card>
    );
}