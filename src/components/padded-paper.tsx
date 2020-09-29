import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

interface Props {
  elevation: number;
  [propName: string]: any;
}

const PaddedPaper: React.FC<Props> = (props: Props): JSX.Element => {
  // mui styles hook
  const classes = useStyles();
  // jsx
  return (
    <Paper className={classes.paper} {...props}>
      {props.children}
    </Paper>
  );
};

export default PaddedPaper;
