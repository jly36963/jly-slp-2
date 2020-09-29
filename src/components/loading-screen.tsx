// react imports
import React from 'react';
// mui imports
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SpinnerSVG from '../images/spinner1.svg';

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: 'fixed',
    background: '#222',
    width: '100%',
    overflow: 'auto',
    zIndex: 10000,
  },
  spinner: {
    color: 'white',
    fontSize: 3 * theme.typography.fontSize,
    marginTop: theme.mixins.toolbar.minHeight,
    marginBottom: theme.mixins.toolbar.minHeight,
    padding: theme.spacing(4),
    zIndex: 1000,
    maxWidth: '300px',
    overflow: 'auto',
  },
}));

const LoadingScreen: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <div className={classes.spinner}>
          <SpinnerSVG style={{ maxWidth: '10vw' }} />
        </div>
      </Grid>
    </Box>
  );
};

export default LoadingScreen;
