import { Button, Card, CardHeader, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useSettings from '../../hooks/useSettings';

export default function ColumnChart() {
    const { themeMode } = useSettings();
    const [value, setValue] = useState("Daily")
    const handleChange = e => {
        setValue(e.target.value)
        console.log(value);
    }

    const xaxisMonthCat = ['week 1', 'week 2', 'week 3', 'week 4'];
    const xaxisDayCat = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    const xaxisValue = [
        ...[value === 'Daily' ? xaxisDayCat : xaxisMonthCat]
    ]
    const monthData1 = [44, 55, 41, 67];
    const dayData1 = [44, 55, 41, 67, 22, 43, 21];
    const data1 = [...[value === 'Daily' ? dayData1 : monthData1]]
    const monthData2 = [13, 23, 20, 8];
    const dayData2 = [13, 23, 20, 8, 13, 27, 33];
    const data2 = [...[value === 'Daily' ? dayData2 : monthData2]]
    const monthData3 = [11, 17, 15, 15];
    const dayData3 = [11, 17, 15, 15, 21, 14, 15];
    const data3 = [...[value === 'Daily' ? dayData3 : monthData3]]
    const monthData4 = [11, 21, 12, 5];
    const dayData4 = [11, 21, 12, 5, 17, 14, 15]
    const data4 = [...[value === 'Daily' ? dayData4 : monthData4]]
    console.log(xaxisValue[0]);
    const chartOptions = {

        series: [{
            name: 'Video',
            data: data1[0]
        }, {
            name: 'Audio',
            data: data2[0]
        }, {
            name: 'Test',
            data: data3[0]
        }, {
            name: 'Cards',
            data: data4[0]
        }],
        options: {
            grid: {
                show: false
            },
            plotOptions: {
                bar: {
                    columnWidth: (value === 'Daily' ? '20%' : '10%')
                }
            },
            chart: {
                width: '10%',
                toolbar: {
                    show: false
                },
                type: 'bar',
                stacked: true,
                stackType: '100%'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            dataLabels: {
                enabled: false,
                style:
                {
                    // colors:themeMode=="light"?"#000": "#fff", 
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                }
            },

            xaxis: {
                categories: xaxisValue[0],
                position: 'top',
                axisBorder: {
                    show: false
                },

                labels:
                {
                    style:
                    {
                        colors: [themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff", themeMode === "light" ? "#000" : "#fff",],
                    }
                }


            },
            yaxis: {
                show: false
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'bottom',
                offsetX: 0,
                offsetY: -7,
                markers: {
                    width: 8,
                    height: 8,
                    radius: 8
                },
                labels: {
                    colors: themeMode === "light" ? "#000" : "#fff",
                },
            },
        },


    };



    return (
        <Card sx={{ boxShadow: 10, p: 3, height: { md: '300px', lg: '400px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ p: 1, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardHeader titleTypographyProps={{ variant: 'inherit' }} sx={{ p: 0 }} title="Spent time on learning" />
                <Box sx={{ mb: 0 }}>
                    {/* <Button
                        variant='outlined'
                        sx={{ border: 'none', p: 0, m: 0, height: '30px' }}
                    > */}
                    <FormControl sx={{ m: 1 }}>
                        <Select
                            sx={{ border: 'none', height: '30px' }}
                            value={value}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            id="outlined-dropdown"

                        >
                            <MenuItem value={"Daily"}>Daily</MenuItem>
                            <MenuItem value={"Monthly"}>Monthly</MenuItem>
                        </Select>
                    </FormControl>
                    {/* </Button> */}
                </Box>
            </Box>
            {/* <Box sx={{ p: 3, pb: 1, height: '80%' }} dir="ltr"> */}
            <ReactApexChart type='bar' options={chartOptions.options} series={chartOptions.series} height={'100%'} />
            {/* </Box> */}

        </Card>
    );
};