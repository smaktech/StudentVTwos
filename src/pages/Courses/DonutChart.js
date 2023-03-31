import { Card, CardHeader, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function DonutChart() {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [chartSeries, setChartSeries] = useState([44, 55, 41, 17, 15])
    const chartOptions = {

        series: chartSeries,
        options: {
            chart: {
                type: 'donut',
                // offsetY:50

            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false,
                offsetX: (isLarge ? -35 : 0),
                offsetY: (isLarge ? 0 : -1),
                height: 250,
                width: 100,
                fontSize: '15px',
                markers: {
                    width: 8,
                    height: 8
                },
                itemMargin: {
                    vertical: isLarge ? 15 : 3
                }
            },
            xaxis: {
                labels: {
                    show: true
                }
            },
            labels: [`IT course`, `Arts`, "Sciences", "Accounts", "Design"],
            // responsive: [{
            //     breakpoint: (isLarge ? 1080 : 780),
            //     options: {
            //         chart: {
            //             height: (isLarge ? 400 : 220)
            //         },
            //         legend: {
            //             position: 'bottom'
            //         }
            //     }
            // }],
        },


    };

    return (
        <Card sx={{ boxShadow: 10,   p: 3, height: { md: '200px', lg: '300px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <CardHeader title="Total Improvement" /> */}
            {/* <Typography>Total Improvement</Typography> */}
            {/* <Box sx={{ alignSelf: 'center',height: '100%' }} dir="ltr"> */}
            <ReactApexChart type="donut" series={chartOptions.series} options={chartOptions.options} width={'120%'} />
            {/* // </Box> */}
        </Card>
    );
};