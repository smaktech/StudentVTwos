// @mui
import { Stack, Button, Divider, Typography, Grid } from '@mui/material';
import MicrosoftLogin from "react-microsoft-login";
import { useGoogleLogin, GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/user';
import { setSession } from '../../utils/jwt';

import { googleClientId, MicrosoftOfficeClientId } from '../../config';
// components
import Iconify from '../../components/Iconify';
// hooks
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

export default function AuthFirebaseSocials({ googleLogin }) {
  const { loginWithGoogle, loginWithFaceBook, loginWithTwitter } = useAuth();

  // const reduxDispatch = useDispatch();

  // const handleLoginGoogleSuccess = async (response) => {
  //   try {

  //     //  dispatch({ type: SET_AUTH_STATUS, payload: { authStatus: true } });
  //     //  dispatch({ type: SET_ACCESS_TOKEN, payload: { accessToken: res.accessToken } });
  //     //  dispatch({ type: SET_USER_DETAILS, payload: { userDetails: res.profileObj } });
  //     //  window.localStorage.setItem("userDetails", JSON.stringify(res.profileObj));
  //     //  window.localStorage.setItem("userAccessToken", res.accessToken)

  //     console.log(response)

  //      const { accessToken, profileObj } = response;
  //      const user = profileObj;
  //      setSession(JSON.stringify({ user, accessToken }));
  //     //  dispatch({
  //     //    type: 'LOGIN',
  //     //    payload: {
  //     //      user
  //     //    }
  //     //  });
  //      reduxDispatch(setUserInfo(user))
  //      history.push('/app/dashboard');

  //   // const provider = new firebase.auth.GoogleAuthProvider();
  //   // return firebase.auth().signInWithPopup(provider);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginTwitter = async () => {
    try {
      await loginWithTwitter();
    } catch (error) {
      console.error(error);
    }
  };

  const authHandler = (err, data) => {
    console.log(data.account.name);// User Name
    console.log(data.account.userName); // User Id
  };


  return (
    <>
      {/* <Stack direction="row" spacing={2} sx={{ border: '1px solid black' }}> */}
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <GoogleLogin
            clientId={googleClientId}
            buttonText="Login w/ Google"
            onSuccess={googleLogin}
            onFailure={(res) => console.log('Login Failed: ', res)}
            cookiePolicy="single_host_origin"
            render={(renderProps) => (
              <Button fullWidth style={{ width: '100%' }} size="large" color="inherit" variant="outlined" onClick={renderProps.onClick}>
                <Iconify icon={'eva:google-fill'} color="#DF3E30" width={24} height={24} />
              </Button>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <MicrosoftLogin clientId={MicrosoftOfficeClientId} authCallback={authHandler} >
            <Button fullWidth style={{ width: '100%' }} size="large" color="inherit" variant="outlined">
              <Iconify icon={'ion:logo-microsoft'} color="#1877F2" width={24} height={24} />
            </Button>
          </MicrosoftLogin>
        </Grid>

        {/* <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginTwitter}>
          <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={24} height={24} />
        </Button> */}
        {/* </Stack> */}
      </Grid>


      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
