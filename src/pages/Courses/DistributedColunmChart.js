import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function DistributedColumnsChart() {
    const chartOptions = {

        series: [{
            data: [21, 22, 10, 28, 16, 21, 13, 30]
        }],
        options: {
            chart: {
                width: 350,
                type: 'bar',
                // events: {
                //     click: function (chart, w, e) {
                //         // console.log(chart, w, e)
                //     }
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: true
                }
            },
            yaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: true
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false
            }
        },
        colors: undefined,
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                ['John', 'Doe'],
                ['Joe', 'Smith'],
                ['Jake', 'Williams'],
                'Amber',
                ['Peter', 'Brown'],
                ['Mary', 'Evans'],
                ['David', 'Wilson'],
                ['Lily', 'Roberts'],
            ],
            labels: {
                style: {
                    colors: undefined,
                    fontSize: '12px'
                }
            }
        }
    };




    return (
        <Card sx={{ boxShadow: 10, height: { xs: '270px', md: '200px', lg: '300px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* <CardHeader title="Column"/> */}
            <Box sx={{ height: '80%' }} dir="ltr">
                <ReactApexChart type="bar" series={chartOptions.series} options={chartOptions.options} height={'100%'} width={"100%"} />
            </Box>
        </Card>
    );
};