import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import useSettings from '../../hooks/useSettings';


export default function DonutChart() {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const { themeMode } = useSettings();
    const [chartSeries, setChartSeries] = useState([44, 55, 41, 17, 15])
    const chartOptions = {

        series: chartSeries,
        options: {
            chart: {
                type: 'donut',

            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: true,
                offsetX: (isLarge ? 0 : -10),
                offsetY: (isLarge ? -5 : -20),
                height: '100%',
                width: 100,
                fontSize: '15px',
                labels: {
                    colors: themeMode === "light" ? "#000" : "#fff",
                },
                markers: {
                    width: 8,
                    height: 8
                },
                itemMargin: {
                    vertical: isLarge ? 5 : 3
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
        <Card sx={{ boxShadow: 10, height: { md: '300px', lg: '400px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardHeader title="Total Improvement" sx={{ mb: 'auto' }} />
            {/* <Box sx={{ alignSelf: 'center',height: '100%' }} dir="ltr"> */}
            <Box sx={{ mb: 'auto' }}>
                <ReactApexChart type="donut" series={chartOptions.series} options={chartOptions.options} width={'100%'} />
            </Box>
        </Card>
    );
};