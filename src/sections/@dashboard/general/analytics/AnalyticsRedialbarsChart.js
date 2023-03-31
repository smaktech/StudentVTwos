import { Card, CardHeader, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function AnalyticsRedialbarsChart() {
    const chartOptions = {

        series: [40],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
                offsetY: -10
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: '16px',
                            color: undefined,
                            offsetY: 120
                        },
                        value: {
                            offsetY: 0,
                            fontSize: '22px',
                            color: undefined,
                            //   formatter: function a(val){
                            //     return val + "%";
                            //   }
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            stroke: {
                dashArray: 4
            },
            labels: [''],
        },


    };

    return (
        // <Card sx={{ height: '100%' }}>
        // <CardHeader title="Website Visits" subheader="(+43%) than last year" />
        <Box sx={{ position: 'relative', p: 3, pb: 1, height: '100%' }} dir="ltr">
            <Box sx={{ position: 'absolute', top: '50%', left: '46%', textAlign: 'center' }}>
                <Typography variant='body1'>points</Typography>
            </Box>
            <ReactApexChart type="radialBar" series={chartOptions.series} options={chartOptions.options} height={'100%'} width={"100%"} />
        </Box>
        // </Card>
    );
};