import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function AnalyticsBasicLineChart() {
    const chartOptions = {

        series: [{
            name: "Chemistry",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        },
        {
            name: "Physics",
            data: [8, 35, 60, 25, 39, 51, 78, 25, 69]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },


    };

    return (
        // <Card sx={{ height: '100%' }}>
        // <CardHeader title="Website Visits" subheader="(+43%) than last year" />
        <Box sx={{ p: 3, pb: 1, height: '80%' }} dir="ltr">
            <ReactApexChart type="line" series={chartOptions.series} options={chartOptions.options} height={'100%'} width={"100%"} />
        </Box>
        // </Card>
    );
};