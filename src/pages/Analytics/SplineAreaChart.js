import { Card, CardHeader, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function SplineAreaChart() {
    const theme = useTheme();
    const chartOptions = {

        series: [{
            name: 'Learning',
            data: [31, 40, 28, 51, 42, 109]
        }, {
            name: 'Exams',
            data: [11, 32, 45, 32, 34, 52]
        }],
        options: {
            chart: {
                toolbar: {
                    show: false
                },
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            legend: {
                position: 'top',
                labels: {
                    colors: theme.palette.text.primary
                }
            },
            xaxis: {
                categories: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
                labels: {
                    style: {
                        colors: [
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                        ]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                            theme.palette.text.primary,
                        ]
                    }
                }
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },


    };

    return (
        <Card sx={{ boxShadow: 10, p: 3, height: { md: '300px', lg: '400px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardHeader title="Learning vs Exams" sx={{ p: 0 }} />
            <Box sx={{ height: '85%' }} dir="ltr">
                <ReactApexChart type="area" series={chartOptions.series} options={chartOptions.options} height={'100%'} width={"100%"} />
            </Box>
        </Card>
    );
};