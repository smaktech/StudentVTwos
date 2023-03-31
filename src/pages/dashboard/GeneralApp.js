import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
// @mui
import { useTheme } from '@mui/material/styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Grid, Link, Box, Stack, Typography, styled, Card, CardMedia, CardContent, CardHeader, Divider, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// // import { SET_ACTIVE_TAB } from '../../Reducers/types';
import DashboardHeader from '../../layouts/dashboard/header';
import {
  getAllBoard,
  getAllCourses,
  getAllSubjects,
  getAllUserCourses,
  getCoursesByFilter,
} from '../../api/Courses/Courses';
// components
import { EcommerceNewProducts } from '../../sections/@dashboard/general/ecommerce';
import { CarouselArrowIndex } from '../../components/carousel';
import RightSideBar from '../../layouts/dashboard/rigthsidebar/RightSideBar';
import Page from '../../components/Page';
import { AppWidgetSummary } from '../../sections/@dashboard/general/app';
import CustomCalendar from './Calendar';
// hooks
import {
  AnalyticsWebsiteVisits,
  AnalyticsCurrentSubject,
  AnalyticsTasks,
  AnalyticsWidgetSummary,
  AnalyticsDonutChart,
  AnalyticsColumnChart,
  AnalyticsSplineAreaChart,
  AnalyticsRedialbarsChart,
} from '../../sections/@dashboard/general/analytics/index';
// import Calendar from './Calendar';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import CarouselAnimation from '../overview/extra/carousel/CarouselAnimation';
import { Bull } from '../Courses/Courses';
import DonutChart from './DonutChart';
import ColumnChart from './ColumnChart';
import SplineAreaChart from './SplineAreaChart';
import RedialbarsChart from './RedialbarsChart';
import MuiCalendar from './MuiCalendar';
// sections

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  // flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));
export default function GeneralApp() {
  // //table data loading indicator
  const [dataLoading, setDataLoading] = useState(false);
  // //sets the all courses of user
  const [userCourses, setUserCourses] = useState([]);
  console.log(userCourses);
  const user = useSelector((state) => state.user.info);
  console.log('user', user);
  const theme = useTheme();
  const [value, onChange] = useState(new Date());
  const { themeStretch } = useSettings();

  useEffect(() => {
    // // fetching all user courses
    setDataLoading(true);
    getAllUserCourses(user?._id)
      .then((res) => {
        console.log('getAllUserCourses', res);
        if (res.status) {
          // //setting the fetched getAllUserCourses into state variable
          setUserCourses(res.courses.slice(0, 3));
          // console.log('hello', res.courses);
        }
        setDataLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user?._id]);

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {/* <Page title="Dashboard"> */}
      {/* <Container maxWidth={themeStretch ? false : 'xl'} sx={{ m: '0', border: '1px solid black' }}> */}
      {/* <DashboardHeader /> */}

      <Grid container spacing={0} sx={{ width: { xs: '90%', md: '98%' }, m: { xs: '0 auto', md: '0 auto' }, p: 0 }}>
        <Grid item xs={12} md={7.5} lg={9}>
          <Box sx={{ mb: 3, display: 'flex', }}>
            {/* <Card sx={{   }}> */}
            <Typography variant='h6'>
              {`Welcome ${user?.name}`}
            </Typography>

            {/* </Card> */}
          </Box>
          <Box sx={{ mb: 3, display: 'flex', flexDirection: 'colunm', justifyContent: 'center', alignItems: 'center' }}>
            <EcommerceNewProducts />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>

              <DonutChart />

            </Grid>
            <Grid item xs={12} md={6}>

              <ColumnChart />

            </Grid>
            <Grid item xs={12} md={6}>

              <SplineAreaChart />

            </Grid>
            <Grid item xs={12} md={6}>

              <RedialbarsChart />

            </Grid>
          </Grid>

          <Box sx={{ my: 3 }}>
            <Box sx={{ mb: 3 }}>
              {userCourses.length > 0 && <Typography variant='h3'>Continue Learning</Typography>}
            </Box>
            {dataLoading ? (
              <Box sx={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
              </Box>
            ) : (
              <>
                <Grid container spacing={isSmall ? 2 : 3} sx={{ width: '100%', mx: '0 auto' }}>
                  {userCourses.map((items, index) => (
                    <>
                      <Grid item xs={12} md={4} lg={4}>
                        <Card variant="outlined" sx={{ boxShadow: 10, borderRadius: '5px' }}>
                          <Link style={{ textDecoration: 'none', color: 'none' }} to={`/dashboard/courses/${items?.courseID?._id}/${items?.courseID?.name}/${items?.courseID?.subjectID?.name}/${items?.courseID?.boardID?.name}`}>
                            <CardContent sx={{ padding: { xs: '2px' } }}>
                              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ boxShadow: 2, borderRadius: '20px', px: '10px', fontSize: { xs: '10px', md: '15px' }, ml: { xs: '5px' } }}>
                                      New
                                    </Typography>
                                     <CardMedia
                                      sx={{ width: '10%' }}
                                      component="img"
                                      image="/Assets/coursesLogo.png"
                                      alt="courses"
                                    />
                                  </Box>
                                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CardMedia
                                      sx={{ width: '50%' }}
                                      component="img"
                                      image="https://www.sheetmetal-iti.org/img/courses_hover.png"
                                      alt="courses"
                                    />
                                  </Box> */}
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mt: '10px',
                                }}
                              >
                                <Typography variant='caption' color="primary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: { xs: "13px", md: '20px' }, width: '100%', textAlign: 'center' }}>
                                  <Bull />

                                  {items.courseID ? items.courseID?.name : ''}
                                </Typography>
                                <Typography variant='body1' color="primary" sx={{ fontSize: { xs: "15px", md: '20px' } }}>{items?.courseID ? items?.courseID?.subjectID?.name : ''}</Typography>
                              </Box>
                            </CardContent>
                          </Link>
                        </Card>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </>
            )}
          </Box>

        </Grid>
        <Grid item xs={12} md={4.5} lg={3}>
          <Box sx={{ width: '100%', height: '100vh', pl: isSmall?0:3,mr:isSmall?1:0, }}>
            <Grid container spacing={0}>
              <Grid item xs={12} sx={{ my: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
                <Card sx={{ boxShadow: 10, width: '100%' }}>
                  {/* <Calendar onChange={onChange} value={value} /> */}
                  <MuiCalendar />
                </Card>
              </Grid>
              <Grid item xs={12} sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AnalyticsTasks />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%', py: 1 }}>
                  <Card sx={{ boxShadow: 10, width: '100%' }}>
                    <CardHeader title="Leaderboard" />
                    <Divider />
                    <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Box sx={{ width: '40px', height: '40px' }}>
                        <img style={{ borderRadius: '50%' }} src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" width={"100%"} height={"100%"} alt="" />
                      </Box>
                      <Typography variant='h6'>Student Name</Typography>
                      <Typography variant='body1'>1</Typography>
                    </Box>
                    <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Box sx={{ width: '40px', height: '40px' }}>
                        <img style={{ borderRadius: '50%' }} src="https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" width={"100%"} height={"100%"} alt="" />
                      </Box>
                      <Typography variant='h6'>Student Name</Typography>
                      <Typography variant='body1'>2</Typography>
                    </Box>
                    <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Box sx={{ width: '40px', height: '40px' }}>
                        <img style={{ borderRadius: '50%' }} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" width={"100%"} height={"100%"} alt="" />
                      </Box>
                      <Typography variant='h6'>Student Name</Typography>
                      <Typography variant='body1'>3</Typography>
                    </Box>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', height: '40px' }}>
                <Box sx={{ zIndex: 2, position: 'fixed', bottom: '2%', right: '2%', borderRadius: '50%', backgroundColor: 'gray', p: 2, color: 'white' }}>
                  <ChatBubbleIcon />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* </Page> */}
      <div>
        {/* <Page title="General: App">
          <Container maxWidth={themeStretch ? false : 'xl'}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Welcome {user && user.name}
            </Typography>

            <div className="row">
              <div className="col-lg-8 col-md-8  ">
                <div className="row">
                  <div className="col-lg-6 col-lg-6 mb-5">
                    <AnalyticsWebsiteVisits />
                  </div>
                  <div className="col-lg-6 col-lg-6 mb-5">
                    <CustomCalendar />
                    <AnalyticsCurrentSubject />
                  </div>
                  <div className="col-lg-6 col-lg-6 mb-5">
                    <AnalyticsWebsiteVisits />
                  </div>
                  <div className="col-lg-6 col-lg-6 mb-5">
                    <AnalyticsWebsiteVisits />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 ">
                <Card>
                  <Calendar onChange={onChange} value={value} />
                </Card>
                <br />
                <AnalyticsTasks />
                <br />
                <Link underline="none" color="inherit">
                  <RootStyle>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          textAlign: 'center',
                          justifyContent: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          height: 200,
                        }}
                      >
                        Leaderboard
                      </Typography>
                    </Box>
                  </RootStyle>
                </Link>
              </div>
            </div>
          </Container>

          <Container maxWidth={themeStretch ? false : 'xl'}>
            <Typography variant="h4" sx={{ mt: 5, mb: 5 }}>
              Continue Learning
            </Typography>

            <div className="row">
              <div className="col-lg-9 col-md-9  ">
                <div className="row">
                  <div className="col-lg-4 col-lg-4 mb-5">
                    <AnalyticsWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
                  </div>
                  <div className="col-lg-4 col-lg-4 mb-5">
                    <AnalyticsWidgetSummary
                      title="New Users"
                      total={1352831}
                      color="info"
                      icon={'ant-design:apple-filled'}
                    />
                  </div>
                  <div className="col-lg-4 col-lg-4 mb-5">
                    <AnalyticsWidgetSummary
                      title="Item Orders"
                      total={1723315}
                      color="warning"
                      icon={'ant-design:windows-filled'}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 ">
                <Link underline="none" color="inherit">
                  <RootStyle>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          textAlign: 'center',
                          justifyContent: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          height: 200,
                        }}
                      >
                        Chat Icon
                      </Typography>
                    </Box>
                  </RootStyle>
                </Link>
              </div>
            </div>
          </Container>
        </Page> */}
      </div>
    </>
  );
}
