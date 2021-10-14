const router = require('express').Router();
const { User, Conversation, Message } = require('../../db/models');
const { Op } = require('sequelize');
const onlineUsers = require('../../onlineUsers');

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: [
        'id',
        'user1UnreadCount',
        'user2UnreadCount',
        'user1Id',
        'user2Id',
      ],
      order: [[Message, 'createdAt', 'ASC']],
      include: [
        { model: Message, order: ['createdAt', 'ASC'] },
        {
          model: User,
          as: 'user1',
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ['id', 'username', 'photoUrl'],
          required: false,
        },
        {
          model: User,
          as: 'user2',
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ['id', 'username', 'photoUrl'],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      const lastIdx = convoJSON.messages.length - 1;
      convoJSON.latestMessageText = convoJSON.messages[lastIdx].text;

      let unreadMessagesCount;

      if (convoJSON.user1Id === userId) {
        unreadMessagesCount = convoJSON.user1UnreadCount;
      } else {
        unreadMessagesCount = convoJSON.user2UnreadCount;
      }

      convoJSON.unreadMessagesCount = unreadMessagesCount;

      convoJSON.lastRead = findLastRead(convoJSON.messages, userId);
      conversations[i] = convoJSON;
    }

    // sort conversations by last message sent
    conversations.sort(
      (a, b) =>
        b.messages[b.messages.length - 1].createdAt -
        a.messages[a.messages.length - 1].createdAt
    );

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.put('/read', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId } = req.body;

    const conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      return res.sendStatus(404);
    }

    if (senderId === conversation.user2Id) {
      conversation.user2UnreadCount = 0;
    } else {
      conversation.user1UnreadCount = 0;
    }
    await conversation.save();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

const findLastRead = (messages, userId) => {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.readStatus && msg.senderId === userId) {
      return msg.id;
    }
  }
  return -1;
};

module.exports = router;
