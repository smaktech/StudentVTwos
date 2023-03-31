import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function AnalyticsColumnChart() {
    const chartOptions = {
        series: [{
            name: 'PRODUCT A',
            data: [44, 55, 41, 67]
        }, {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8]
        }, {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15]
        }],
        options: {
            chart: {
                type: 'bar',
                // height: 350,
                stacked: true,
                stackType: '100%'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: 10,
                        offsetY: 0
                    }
                }
            }],
            xaxis: {
                categories: ['Q1', 'Q2', 'Q3', 'Q4'],
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'right',
                offsetX: -20,
                offsetY: 10
            },
        },


    };



    return (
        // <Card sx={{ height: '100%' }}>
        // <CardHeader title="Website Visits" subheader="(+43%) than last year" />
        // <Box sx={{ p: 3, pb: 1, height: '80%' }} dir="ltr">
            <ReactApexChart type='bar' options={chartOptions.options} series={chartOptions.series} height={'100%'} width={"100%"} />
        // </Box>
        // </Card>
    );
};