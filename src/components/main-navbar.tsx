// react imports
import React, { useState } from 'react';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Badge,
  InputBase,
  Menu,
  MenuItem,
} from '@material-ui/core';
// icons
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// Router
import Router from 'next/router';
import Link from 'next/link';
// utils
import { auth } from '../utils/firebase.utils';
import storage from '../utils/storage';

// styles
const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1, // https://stackoverflow.com/questions/51066461/drawer-covers-appbar-in-material-ui
  },
  menuIcon: {
    margin: theme.spacing(1),
  },
  unstyledLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  grow: {
    flexGrow: 1,
  },
}));

interface Props {
  [propName: string]: any;
}

// component
const MainNavbar: React.FC<Props> = ({
  useDarkTheme,
  setUseDarkTheme,
  authState,
}: Props): JSX.Element => {
  // --------------
  // state
  // --------------

  // mui styles
  const classes = useStyles();

  // current user
  const { currentUser } = authState;

  // menu
  const [anchorEl, setAnchorEl] = useState(null);

  // --------------
  // event
  // --------------

  // menu
  const handleMenuOpen = (e: React.SyntheticEvent): void => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  // darkstate
  const handleDarkSwitchChange = (): void => {
    const newThemeState = !useDarkTheme;
    storage.setItem('useDarkTheme', newThemeState);
    setUseDarkTheme(newThemeState);
  };

  // auth
  const handleLogin = (): void => {
    Router.push('/auth/login');
  };
  const handleSignOut = async (): Promise<void> => {
    // sign out firebase user
    await auth.signOut();
  };
  const handleHome = (): void => {
    Router.push('/');
  };

  // --------------
  // jsx
  // --------------

  return (
    <Box className={classes.root}>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
          <Link href={`/`}>
            <a className={classes.unstyledLink}>
              <Typography variant="h5" onClick={handleHome}>
                Spotify Lyrics Player
              </Typography>
            </a>
          </Link>
          {/* pushes title left, buttons right */}
          <div className={classes.grow} />
          {/* menu */}
          <IconButton onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            // must be provided if anchorOrigin.vertical is changed
            getContentAnchorEl={null}
          >
            <MenuItem onClick={handleDarkSwitchChange}>
              <Brightness4Icon className={classes.menuIcon} />
              Theme
            </MenuItem>

            <MenuItem onClick={handleHome}>
              <HomeIcon className={classes.menuIcon} />
              Home
            </MenuItem>

            {currentUser ? (
              <MenuItem onClick={handleSignOut}>
                <ExitToAppIcon className={classes.menuIcon} />
                Log Out
              </MenuItem>
            ) : (
              <MenuItem onClick={handleLogin}>
                <AccountCircleIcon className={classes.menuIcon} />
                Log In
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavbar;
