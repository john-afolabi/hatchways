import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(5),
    overflowY: 'scroll',
    height: '70vh',
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
}));

const Messages = ({ messages, otherUser, userId }) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const reverseMessages = messages.slice().reverse();

  const lastSentMessageId = reverseMessages.find(
    (message) => message.senderId === userId && message.readStatus === true
  )?.id;

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (
    <Box className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            readStatus={message.readStatus}
            lastSentMessage={lastSentMessageId === message.id}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default Messages;
