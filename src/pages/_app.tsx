// react imports
import React, { useState, useEffect, useMemo } from 'react';
// next imports
import Head from 'next/head';
import type { AppProps } from 'next/app';
// mui imports
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
// component imports
import MainNavbar from '../components/main-navbar';
import LoadingScreen from '../components/loading-screen';
// theme imports
import { lightTheme, darkTheme } from '../theme/theme';
// util imports
import { auth } from '../utils/firebase.utils';
import storage from '../utils/storage';

// component
const App = ({ Component, pageProps }: AppProps) => {
  // ---------
  // dark theme
  // ---------

  // initial theme (SSR)
  const [useDarkTheme, setUseDarkTheme] = useState(true);
  const theme = useMemo(() => {
    return useDarkTheme ? darkTheme : lightTheme;
  }, [useDarkTheme]);
  // update theme
  useEffect(() => {
    let useDarkThemeLS = storage.getItem('useDarkTheme');
    if (typeof useDarkThemeLS !== 'boolean') {
      useDarkThemeLS = true;
      storage.setItem('useDarkTheme', true);
    }
    if (!useDarkThemeLS) {
      setUseDarkTheme(useDarkThemeLS);
    }
  }, []);

  // ---------
  // loading screen
  // ---------

  // loading screen
  const [useLoadingScreen, setUseLoadingScreen] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setUseLoadingScreen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ------------
  // auth
  // ------------

  interface AuthState {
    currentUser: any;
    userData: any;
    initialized: boolean;
  }

  const initialAuthState: AuthState = {
    currentUser: auth.currentUser || null,
    userData: null,
    initialized: false,
  };
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  // firebase subscription
  useEffect(() => {
    // handle status updates (synchronous)
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // when auth changes -- update 'currentUser', trigger 'userData' update
      setAuthState({
        ...authState,
        currentUser: currentUser,
        userData: null,
        initialized: false,
      });
    });
    // cleanup
    return unsubscribe;
  }, []);

  // update userData when auth changes
  useEffect(() => {
    // only run effect if not initialized
    if (authState.initialized) return;

    // get userData
    let userData: any;
    if (auth.currentUser) {
      // get user data
      // *** db fetch logic here ***
      userData = {};
    } else {
      // reset user data
      userData = null;
    }
    setAuthState({ ...authState, userData, initialized: true });
  }, [authState.currentUser, authState.initialized]);

  // ---------
  // jsx
  // ---------

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* loading screen */}
      {useLoadingScreen && <LoadingScreen />}
      {/* navbar */}
      <MainNavbar
        useDarkTheme={useDarkTheme}
        setUseDarkTheme={setUseDarkTheme}
        authState={authState}
      />
      {/* head */}
      <Head>
        <title>Spotify Lyrics Player</title>
      </Head>
      {/* component */}
      <Component {...pageProps} authState={authState} />
    </ThemeProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
