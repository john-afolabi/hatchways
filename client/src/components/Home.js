import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CssBaseline, makeStyles } from '@material-ui/core';
import { SidebarContainer } from './Sidebar';
import { ActiveChat } from './ActiveChat';
import { fetchConversations } from '../store/utils/thunkCreators';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    setIsLoggedIn(true);
  }, [user.id]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};

export default Home;
