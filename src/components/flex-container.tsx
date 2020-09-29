import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: any) => ({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '640px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '768px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1024px',
    },
  },
  main: {
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: 'auto',
    borderWidth: '1px',
    borderRadius: '.25rem',
  },
  spacer: {
    height: theme.mixins.toolbar.minHeight,
  },
}));

const FlexContainer: React.FC = (props: any): JSX.Element => {
  // mui styles hook
  const classes = useStyles();
  // jsx
  return (
    <>
      <div className={classes.spacer} />
      <div className={classes.container}>
        <div className={classes.main}>{props.children}</div>
      </div>
    </>
  );
};

export default FlexContainer;
