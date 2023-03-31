import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function AnalyticsDistributedColumnsChart() {
    const chartOptions = {

        series: [{
            data: [21, 22, 10, 28, 16, 21, 13, 30]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                // events: {
                //     click: function (chart, w, e) {
                //         // console.log(chart, w, e)
                //     }
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
        // <Card sx={{ height: '100%' }}>
        // <CardHeader title="Website Visits" subheader="(+43%) than last year" />
        <Box sx={{ p: 3, pb: 1, height: '80%' }} dir="ltr">
            <ReactApexChart type="bar" series={chartOptions.series} options={chartOptions.options} height={'100%'} width={"100%"} />
        </Box>
        // </Card>
    );
};