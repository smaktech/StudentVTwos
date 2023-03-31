import { useState } from 'react';
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Button, Typography, styled, Box, Link, makeStyles, } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';
import MyAvatar from '../../../components/MyAvatar';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));
NavbarDocs.propTypes = {
  isCollapse: PropTypes.bool,
};



export default function NavbarDocs({ isCollapse }) {
  const [design1, setDesign1] = useState('outlined')
  const [design2, setDesign2] = useState('outlined')
  const { user } = useAuth();
  return (
    // <Stack spacing={3} alignItems="center" sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center' }}>
    //   <DocIllustration sx={{ width: 1 }} />

    //   <div>
    //     <Typography gutterBottom variant="subtitle1">
    //       Hi, {user?.displayName}
    //     </Typography>
    //     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    //       Need help?
    //       <br /> Please check our docs
    //     </Typography>
    //   </div>

    //   <Button href={PATH_DOCS} target="_blank" rel="noopener" variant="contained">
    //     Documentation
    //   </Button>
    // </Stack>
    <>
      <Link underline="none" color="inherit" >
        <RootStyle
          sx={{
            ml: 3,
            mr: 3, 
            mt:2,
            pb:0,
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          {/* <Typography  variant="h4" sx={{ mb: 5,justifyContent:'center',display:'flex' }}>
          Satyendra Kumar
        </Typography> */}
          <Box
            sx={{
              mt:'auto',
             
              // ml: 2,     
              textAlign: 'center',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            {/* <Typography variant="button" sx={{ pt: 1, pb: 1 }} noWrap>
              Subscribe to Premium
            </Typography> */}
            <Button
              variant={design1}
              onMouseEnter={() => setDesign1('contained')}
              onMouseLeave={() => setDesign1('outlined')}
              sx={{pt:1,pb:1}}
              component={RouterLink}
              to={"/dashboard/courses/allcourses"}
              className="subscribeToPremiumBtn"
            >
              Subscribe To Premium
            </Button>
          </Box>
        </RootStyle>
      </Link>
      <Link underline="none" color="inherit" >
        <RootStyle
          sx={{
            ml: 3,
            mr: 3,
            mb: 1,
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >

          <Box
            sx={{
              // ml: 2,   

              textAlign: 'center',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            {/* <Typography variant="button" noWrap>
              Refer a  Friend
            </Typography> */}
            <Button
              variant={design2}
              onMouseEnter={() => setDesign2('contained')}
              onMouseLeave={() => setDesign2('outlined')}
              sx={{pl:5.5,pr:5.5}}
            >
              Refer a  Friend
            </Button>
          </Box>
        </RootStyle>
      </Link>
    </>
  );
}
