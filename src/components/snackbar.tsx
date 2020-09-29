// react imports
import React from 'react';
// mui imports
import { makeStyles } from '@material-ui/styles';
import { amber, green, grey } from '@material-ui/core/colors';
import { IconButton, Snackbar, SnackbarContent, Box } from '@material-ui/core/';
// icon imports
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

// mui style
const useStyles = makeStyles((theme: any) => ({
  success: {
    backgroundColor: green[600],
    color: '#ffffff',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: '#ffffff',
  },
  info: {
    backgroundColor: grey[800],
    color: '#ffffff',
  },
  warning: {
    backgroundColor: amber[700],
    color: '#ffffff',
  },
  snackbar: {
    // bottom: theme.mixins.toolbar.minHeight + 20 // if using footer
    bottom: theme.spacing(4),
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

// interfaces
interface Props {
  message: string;
  type: string;
  open: boolean;
  onClose: any;
  [propName: string]: any;
}

// component
const CustomSnackbar: React.FC<Props> = ({
  message,
  type,
  open,
  onClose,
}: Props): JSX.Element => {
  const classes = useStyles();
  // determin Icon and classname to use
  let Icon: any;
  let dynamicClassName: any;
  switch (type) {
    case 'success':
      Icon = CheckCircleIcon;
      dynamicClassName = classes.success;
      break;
    case 'warning':
      Icon = WarningIcon;
      dynamicClassName = classes.warning;
      break;
    case 'error':
      Icon = ErrorIcon;
      dynamicClassName = classes.error;
      break;
    case 'info':
      Icon = InfoIcon;
      dynamicClassName = classes.info;
      break;
    default:
      Icon = InfoIcon;
      dynamicClassName = classes.info;
  }

  // jsx
  return (
    <Box>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000} // call 'onClose' after 'n' milliseconds
        onClose={onClose}
      >
        <SnackbarContent
          className={dynamicClassName}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={dynamicClassName}>
              <Icon className={`${classes.icon} ${classes.iconVariant}`} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </Box>
  );
};

export default CustomSnackbar;
