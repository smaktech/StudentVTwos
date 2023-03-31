import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import useSettings from '../../hooks/useSettings';

export default function SplineAreaChart() {
    const { themeMode } = useSettings();
    console.log(themeMode)
    const chartOptions = {

        series: [{
            name: 'Materials',
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
                    colors: 'primary'
                }
            },
            xaxis: {
                labels:
                {
                    style:
                    {
                        colors: [themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff",],
                    }
                },
                categories: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
            },
            yaxis: {
                labels:
                {
                    style:
                    {
                        colors: [themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff",],
                    }
                },
                categories: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
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
            <CardHeader title="Learning Activity" sx={{ p: 0 }} />
            <Box sx={{ height: '85%' }} dir="ltr">
                <ReactApexChart type="area" series={chartOptions.series} options={chartOptions.options} height={'100%'} width={"100%"} />
            </Box>
        </Card>
    );
};