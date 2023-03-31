import * as React from 'react';
import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Divider, Grid, Button, Menu, MenuItem, Container, Typography, Box, Select, Card, CardHeader, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
  AnalyticsDonutChart,
  AnalyticsColumnChart,
  AnalyticsRedialbarsChart,
  AnalyticsDistributedColumnsChart,
  AnalyticsBasicLineChart,
  AnalyticsSplineAreaChart
} from '../../sections/@dashboard/general/analytics';
import ColumnChart from './ColumnChart';
import Overview from './Overview';
import Subject from './Subject';
import PaymentSuccess from '../PaymentSuccess';

// ----------------------------------------------------------------------


export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();

  const [value, setValue] = useState("Overview")
  const handleChange = e => {
    setValue(e.target.value)
    console.log(value);
  }

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Box sx={{ mb: 1 }}>
          <Select
            onChange={handleChange}
            value={value}
            sx={{ height: '40px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            id="outlined-dropdown"
          >

            <MenuItem value={"Subject"}>Overview</MenuItem>
            <MenuItem value={"Overview"}>Subject</MenuItem>
          </Select>
        </Box>
        {value === "Subject" &&
          <>
            <Overview />
          </>
        }
        {value === "Overview" &&
          <>
            <Subject />
          </>
        }
        {/* <PaymentSuccess /> */}
        <div>
          {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Item Orders"
              total={1723315}
              color="warning"
              icon={'ant-design:windows-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks />
          </Grid>
        </Grid> */}
        </div>
      </Container>
    </Page>
  );
}
