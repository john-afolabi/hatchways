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
import { connect } from 'react-redux';
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

const CurrentUser = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const user = props.user || {};

  const handleLogout = async () => {
    await props.logout(user?.id);
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
