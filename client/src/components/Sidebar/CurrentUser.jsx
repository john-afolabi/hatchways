import React, { useState } from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Button,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { BadgeAvatar } from './index';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { logout } from '../../store/utils/thunkCreators';
import { clearOnLogout } from '../../store/index';

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: 'flex',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 17,
  },
  ellipsis: {
    color: '#95A7C4',
    opacity: 0.5,
  },
}));

const CurrentUser = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user) || {};
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout(user?.id));
    dispatch(clearOnLogout());
  };

  const onMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <IconButton aria-label="more" aria-haspopup="true" onClick={onMenuOpen}>
          <MoreHorizIcon classes={{ root: classes.ellipsis }} />
        </IconButton>
        <Menu open={open} anchorEl={anchorEl} onClose={onMenuClose}>
          <MenuItem>
            <Button aria-label="logout" onClick={handleLogout} color="primary">
              Logout
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default CurrentUser;
