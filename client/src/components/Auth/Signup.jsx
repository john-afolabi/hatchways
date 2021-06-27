import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Box,
} from '@material-ui/core';
import { register } from '../../store/utils/thunkCreators';
import useStyles from './styles';
import CTA from './CTA';

const SignUp = (props) => {
  const { user, register } = props;
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid item container xs={12} md={7} direction="column" justify="center">
      <CTA
        ctaText="Already have an account?"
        buttonText="Login"
        path="/login"
      />
      <Box pl="10vw">
        <Grid container direction="column">
          <Typography variant="h4">Create an account.</Typography>
          <form onSubmit={handleRegister} className={classes.form}>
            <FormControl margin="normal">
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                margin="normal"
                required
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                margin="normal"
                required
              />
            </FormControl>

            <FormControl margin="normal">
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                margin="normal"
                required
              />
            </FormControl>

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                margin="normal"
                className={classes.primaryBtn}
              >
                Create
              </Button>
            </Box>
          </form>
        </Grid>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
