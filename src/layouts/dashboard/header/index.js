import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Button,Badge } from '@mui/material';
//
import useSettings from '../../../hooks/useSettings';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';

import Settings from '../../../components/settings';
import ToggleButton from '../../../components/settings/ToggleButton';
// ----------------------------------
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {
  DASHBOARD_NAVBAR_WIDTH,
  DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
  DASHBOARD_HEADER_MOBILE,
  DASHBOARD_HEADER_DESKTOP,
  defaultSettings,
} from '../../../config';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';

import { useSelector } from 'react-redux';
//------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})(({ isCollapse, theme }) => ({
  boxShadow: 'none',
  ...cssStyles(theme).bgBlur(),
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DASHBOARD_NAVBAR_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${DASHBOARD_NAVBAR_COLLAPSE_WIDTH}px)`,
    }),
  },
  // [theme.breakpoints.up('lg')]: {
  //   width: '100%',
  //   ...(isCollapse && {
  //     width: '100%',
  //   }),
  //   position: 'static',
  //   height: '100px'

  // },
  // [theme.breakpoints.up('md')]: {
  //   width: '100%',
  //   ...(isCollapse && {
  //     width: '100%',
  //   }),
  //   position: 'static',
  //   height: '100px',
  //   // display: 'inline'

  // }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: DASHBOARD_HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
    minHeight: DASHBOARD_HEADER_DESKTOP - 40,
  },
  [theme.breakpoints.up('md')]: {
    minHeight: DASHBOARD_HEADER_DESKTOP - 40
  }
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardHeader({ onOpenSidebar }) {
  const { isCollapse } = useCollapseDrawer();
  const history = useNavigate();
  const cartItemsCount  = useSelector(state=>state.cart.cartItemsCount)
  const isDesktop = useResponsive('up', 'lg');
  const [open, setOpen] = useState(false);

  const { themeMode, onToggleMode } = useSettings();
  console.log("cartItemsCount ",cartItemsCount)
  return (
    <>
      <RootStyle isCollapse={isCollapse}>
        <ToolbarStyle>
          {!isDesktop && (
            <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
              <Iconify icon="eva:menu-2-fill" />
            </IconButtonAnimate>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Searchbar />

          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            <NotificationsPopover />
            

              {/* <IconButtonAnimate   size="large" color={open ? 'primary' : 'default'} onClick={()=> history(``)}>
                {cartItemsCount>0?( 
                    <Badge badgeContent={cartItemsCount} color="error">
                      <Iconify icon="ant-design:shopping-cart-outlined" width={20} height={20} />
                    </Badge>
                ):(
                  <Iconify icon="ant-design:shopping-cart-outlined" width={20} height={20} />
                )}
                
              </IconButtonAnimate> */}
            {/* <LanguagePopover />
            <ContactsPopover />
            

            <ToggleButton open={open} notDefault={notDefault} onToggle={handleToggle} /> */}
            <IconButtonAnimate color="inherit" onClick={onToggleMode} sx={{ color: 'text.primary' }}>
              <Iconify icon={themeMode === 'light' ? 'il:moon' : 'uil:sun'} color="#b29603" width={20} height={20} />
            </IconButtonAnimate>

            {/* <Settings open={open} handleToggle={handleToggle} handleClose={handleClose}/> */}
            <AccountPopover />
          </Stack>
        </ToolbarStyle>
      </RootStyle>
    </>
  );
}
