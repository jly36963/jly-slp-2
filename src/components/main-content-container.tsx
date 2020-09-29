import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: any) => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(12),
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
    padding: theme.spacing(4),
  },
}));

const MainContentContainer: React.FC = (props: any): JSX.Element => {
  // mui styles hook
  const classes = useStyles();
  // jsx
  return (
    <div className={classes.container}>
      <div className={classes.main}>{props.children}</div>
    </div>
  );
};

export default MainContentContainer;
