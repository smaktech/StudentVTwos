import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { Grid, Typography, styled } from '@mui/material';
import ExaminationSidebar from '../../pages/examination/ExaminationSidebar';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import {
  DASHBOARD_NAVBAR_WIDTH,
  DASHBOARD_HEADER_MOBILE,
  DASHBOARD_HEADER_DESKTOP,
  DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
} from '../../config';
//
import DashboardHeader from './header';
import DashboardNavbar from './navbar';
import { useSelector } from 'react-redux';
import { getCartCourse } from 'src/api/Subscription/subscription';

import { useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/slices/cart';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    minHeight: '100%',
  },
}));

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: DASHBOARD_HEADER_MOBILE + 10,
  paddingBottom: DASHBOARD_HEADER_MOBILE + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: DASHBOARD_HEADER_DESKTOP - 40,
    paddingBottom: DASHBOARD_HEADER_DESKTOP + 24,
    width: `calc(100% - ${DASHBOARD_NAVBAR_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { collapseClick } = useCollapseDrawer();
  
  const userDetails = useSelector((state) => state.user.info);
  const userId = userDetails?._id
  const [open, setOpen] = useState(false);

  const reduxDispatch = useDispatch();
  useEffect(() => {
    console.log('hello', userId)
    if (userId) {
      getCartCourse(userId)
        .then(data => { 
          console.log(data)
          reduxDispatch(setCartItems(data?.cart?.courses))
        })
    }
    
  }, [userId])

  return (
    <>

      {/* <Grid container spacing={0}>
        <Grid xs={12} md={9} lg={9}> */}
      <RootStyle>
        <DashboardHeader onOpenSidebar={() => setOpen(true)} />
        <DashboardNavbar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle collapseClick={collapseClick}>

          <Outlet />
        </MainStyle>
      </RootStyle>
      {/* </Grid> */}

      {/* <Grid xs={12} md={3} lg={3}> */}
      {/* <ExaminationSidebar /> */}
      {/* </Grid> */}

      {/* </Grid> */}
    </>
  );
}
