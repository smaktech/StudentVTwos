import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// utils

import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../../components/chart';


// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(1),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [12244, 53345, 44313, 78343];

export default function RedialbarsChart() {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

    const chartOptions = merge(BaseOptionChart(), {
        colors: [
            theme.palette.primary?.lighter,
            theme.palette.primary.dark,
            theme.palette.primary.main,
            theme.palette.primary.dark,
        ],
        labels: ['Mac', 'Window', 'iOS', 'Android'],
        dataLabels: {
            enabled: false
        },
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '90%',
                    labels: {
                        value: {
                            formatter: (val) => fNumber(val),
                        },
                        total: {
                            formatter: (w) => {
                                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return fNumber(sum);
                            },
                        },
                    },
                },
            },
        },
    });

    return (
        <Card sx={{ boxShadow: 10, p: 3, height: { md: '300px', lg: '400px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardHeader title="Progress" />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={290} />
            </ChartWrapperStyle>
        </Card>
    );
}
