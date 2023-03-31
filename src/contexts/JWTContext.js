import { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
// utils
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/slices/user';
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { RestLogin, RestSignup } from '../api/Auth/Auth';
// ----------------------------------------------------------------------


const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
















  
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessTokenObj = JSON.parse(window.localStorage.getItem('accessToken'));
        const { accessToken, user } = accessTokenObj;
        if (accessToken && isValidToken(accessToken)) {
          setSession(JSON.stringify(accessTokenObj));
          // const response = await RestLogin( email, password );
          // const { user } = response;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });

          reduxDispatch(setUserInfo(user));
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          reduxDispatch(setUserInfo(null));
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
        reduxDispatch(setUserInfo(null));
      }
    };

    initialize();
  }, []);


  const [loginError, setLoginError] = useState('')
  const login = async (email, password) => {
    const response = await RestLogin(email, password);
    console.log(response);
    if (response.status) {
      const { accessToken, user } = response;

      setSession(JSON.stringify({ user, accessToken }));
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
      reduxDispatch(setUserInfo(user));
    } else {
      setLoginError(response.message);
      throw response.message;
    }
  };

  const googleLogin = async (googleResponse) => {
    // const response = await RestLogin(email, password)
    const response = googleResponse;
    const ErrorMessage = { message: 'Wrong Email Or Password' };
    console.log(response);
    if (response.accessToken) {
      const { accessToken, profileObj } = response;
      const user = profileObj;
      setSession(JSON.stringify({ user, accessToken }));
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
      reduxDispatch(setUserInfo(user));
    } else {
      throw ErrorMessage.message;
    }
  };
  const register = async (email, password, name, phoneNumber, school) => {
    const response = await RestSignup(email, password, name, phoneNumber, school);
     
    if(response.status)
    {
      const { accessToken, user } = response;

      setSession(JSON.stringify({ user, accessToken }));
      // window.localStorage.setItem('accessToken', JSON.stringify(accessToken, user));
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
      reduxDispatch(setUserInfo(user));
    }else
    {
      setLoginError(response.message);
      throw response.message;
    }
    
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => { };

  const updateProfile = () => { };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        googleLogin,
        loginError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
