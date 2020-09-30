// react imports
import React, { useState } from 'react';
// mui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography, TextField } from '@material-ui/core';
// component imports
import PaddedPaper from '../../components/padded-paper';
import FlexContainer from '../../components/flex-container';
import CustomSnackbar from '../../components/snackbar';
// auth
import RedirectLoggedIn from '../../components/auth/redirect-logged-in';
// util imports
import { auth } from '../../utils/firebase.utils';

const useStyles = makeStyles((theme) => ({
  unstyledLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  formDescription: {
    marginTop: theme.spacing(2),
  },
  input: {
    // Chrome likes to ruin forms. This keeps chrome from doing that.
    '&:-webkit-autofill': {
      WebkitBoxShadow: `inset 0 0 0px 9999px ${theme.palette.background.paper}`,
      WebkitTextFillColor: theme.palette.text.primary,
    },
  },
  inputBox: {
    marginTop: theme.spacing(2),
  },
  button: {
    display: 'inline-block',
    margin: theme.spacing(1),
  },
  buttonBox: {
    marginTop: theme.spacing(2),
  },
}));

// component
const Login: React.FC = (): JSX.Element => {
  // ---------
  // state
  // ---------

  // mui styles
  const classes = useStyles();

  interface ResetPasswordForm {
    email: string;
  }

  const [formState, setFormState] = useState<ResetPasswordForm>({
    email: '',
  });

  const [feedback, setFeedback] = useState({
    type: 'info',
    message: 'Default Message',
    open: false,
  });

  // ---------
  // events
  // ---------

  const onChange = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') return; // don't close snackbar on clickaway
    setFeedback({ ...feedback, open: false }); // close snackbar
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { email } = formState;
      await auth.sendPasswordResetEmail(email);
      setFormState({ email: '' });
      setFeedback({
        type: 'success',
        message: `Email sent to ${email}`,
        open: true,
      });
    } catch (err) {
      console.log(err);
      setFeedback({
        type: 'error',
        message: 'Error while attempting to reset password.',
        open: true,
      });
    }
  };

  // ---------
  // jsx
  // ---------

  return (
    <FlexContainer>
      <PaddedPaper elevation={3}>
        <Box
          minHeight="150px"
          width="300px"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          p={2}
        >
          <Typography
            align="center"
            color="inherit"
            display="block"
            variant="h5"
          >
            Reset Password
          </Typography>

          <form onSubmit={handleReset}>
            <Box
              component="div"
              className={classes.inputBox}
              textAlign="center" // left, right, center
            >
              <TextField
                className={classes.input}
                type="email"
                name="email"
                label="Email"
                margin="dense"
                variant="outlined"
                value={formState.email}
                onChange={onChange}
                fullWidth
                inputProps={{ className: classes.input }}
              />
            </Box>

            <Box
              component="div"
              className={classes.buttonBox}
              textAlign="center" // left, right, center
            >
              <Button
                className={classes.button}
                variant="outlined" // contained, outlined, text (text if this prop isn't provided)
                color="inherit" // primary, secondary, default (default if this prop isn't provided)
                component="button" // button, span
                onClick={handleReset}
              >
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </PaddedPaper>

      {/* feedback (snackbar) */}
      <CustomSnackbar
        message={feedback.message}
        type={feedback.type}
        open={feedback.open}
        onClose={handleCloseSnackbar}
      />
    </FlexContainer>
  );
};

export default RedirectLoggedIn(Login);
