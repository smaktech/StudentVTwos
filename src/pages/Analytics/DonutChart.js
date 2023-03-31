import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function DonutChart() {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const isSmall = useMediaQuery(theme.breakpoints.up('xs'));
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
                show: false,
                offsetX: (isLarge ? 30 : -10),
                offsetY: (isLarge ? 40 : -20),
                height: 250,
                fontSize: '15px',
                markers: {
                    width: 8,
                    height: 8
                },
                itemMargin: {
                    vertical: 15
                }
            },
            xaxis: {
                labels: {
                    show: true
                }
            },
            labels: [`GCSE ITEE Test `, `International Baccalaureate (IB) borad testrj Combined Biology`, "English", "Accounts", "Transvere wave"],
            responsive: [{
                breakpoint: (isLarge ? 1080 : 480),
                options: {
                    chart: {
                        width: (isLarge ? 400 : 200)
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
        },


    };

    return (
        <Card sx={{ boxShadow: 10,p: 3,pt:0, height: { md: '300px', lg: '400px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardHeader title="Learning Overview" />
            <Box sx={{ alignSelf: 'center', height: '100%' }}>
                <ReactApexChart type="donut" series={chartOptions.series} options={chartOptions.options} height={'100%'} width={"100%"} />
            </Box>
        </Card>
    );
};