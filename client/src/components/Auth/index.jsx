import React from 'react';
import { Grid, Typography, Hidden } from '@material-ui/core';
import useStyles from './styles';
import bubble from '../../assets/images/svg/bubble.svg';
import Login from './Login';
import Signup from './Signup';

export default function Auth({ type }) {
  const classes = useStyles();

  const renderAuth = (type) => {
    switch (type) {
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'passwordreset':
        return <p>TODO!</p>;
      default:
        return <Login />;
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Hidden smDown>
        <Grid item xs={false} md={5} className={classes.background}>
          <Grid
            container
            direction="column"
            justify="center"
            className={classes.gradient}
          >
            <img src={bubble} alt="logo" />
            <Grid item lg={6} md={10}>
              <Typography
                variant="h4"
                align="center"
                color="secondary"
                className={classes.introText}
              >
                Converse with anyone with any language
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      {renderAuth(type)}
    </Grid>
  );
}
