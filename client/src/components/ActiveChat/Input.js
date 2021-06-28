import React, { useState } from 'react';
import { FormControl, FilledInput, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { postMessage } from '../../store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
}));

const Input = ({ user, otherUser, conversationId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    if (!!text) {
      const reqBody = {
        text,
        recipientId: otherUser.id,
        conversationId: conversationId,
        sender: conversationId ? null : user,
      };
      await dispatch(postMessage(reqBody));
      setText('');
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

export default Input;
