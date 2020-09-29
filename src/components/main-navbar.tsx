// react imports
import React from 'react';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Box, MenuItem } from '@material-ui/core';
// icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
// Router
import Router from 'next/router';
import Link from 'next/link';
// utils
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
}: Props): JSX.Element => {
  // --------------
  // state
  // --------------

  // use custom hook (material-ui)
  const classes = useStyles();

  // --------------
  // event
  // --------------

  // darkstate
  const handleDarkSwitchChange = (): void => {
    const newThemeState = !useDarkTheme;
    storage.setItem('useDarkTheme', newThemeState);
    setUseDarkTheme(newThemeState);
  };

  return (
    <Box className={classes.root}>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
          <Link href={`/`}>
            <a className={classes.unstyledLink}>
              <Typography variant="h5" onClick={() => Router.push('/')}>
                Spotify Lyrics Player
              </Typography>
            </a>
          </Link>
          {/* pushes title left, buttons right */}
          <div className={classes.grow} />
          {/* theme */}
          <MenuItem onClick={handleDarkSwitchChange}>
            <Brightness4Icon className={classes.menuIcon} />
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavbar;
