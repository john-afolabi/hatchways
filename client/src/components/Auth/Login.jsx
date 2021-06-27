import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Link,
  InputAdornment,
  Box,
} from '@material-ui/core';
import { login } from '../../store/utils/thunkCreators';
import useStyles from './styles';
import CTA from './CTA';

const Login = (props) => {
  const { user, login } = props;
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid item container xs={12} md={7} direction="column" justify="center">
      <CTA
        ctaText="Don't have an account?"
        buttonText="Create account"
        path="/register"
      />
      <Box pl="10vw">
        <Grid container direction="column">
          <Typography variant="h4">Welcome back!</Typography>
          <form onSubmit={handleLogin} className={classes.form}>
            <FormControl margin="normal">
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="username"
                margin="normal"
                required
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                label="Password"
                aria-label="password"
                type="password"
                name="password"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <Link href="#" color="primary">
                        Forgot?
                      </Link>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </FormControl>
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                className={classes.primaryBtn}
              >
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
