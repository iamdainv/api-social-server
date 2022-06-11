const { getMessageOfRoom, createNewMessage } = require('./message.service');

require('dotenv').config();

const LIMIT_MESSAGE_RESPONSE = 100000;

const connection = (socket) => {
  const { user } = socket.handshake.auth;

  socket.on('online', () => {
    socket.join(`user:${user.id}`);
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(`room:${roomId}`);
  });

  socket.on('newChat', (chat) => {
    chat.members.forEach((member) => {
      socket.to(`user:${member._id}`).emit('newChatReceive', chat);
    });
  });

  socket.on('getMessagesOfRooms', (dataChats, callback) => {
    Promise.all([...[...dataChats].map(({ id }) => getMessageOfRoom(id, LIMIT_MESSAGE_RESPONSE, 0))]).then((res) => {
      dataChats.forEach(({ id }) => {
        socket.join(`room:${id}`);
      });
      socket.emit(
        'getMessagesOfRoomsResponse',
        dataChats.map((chat, idx) => ({
          ...chat,
          messages: res[idx],
        }))
      );

      // eslint-disable-next-line no-unused-expressions
      callback && callback();
    });
  });

  socket.on('sendMessage', async (messageData, callback) => {
    try {
      const { newMessage, roomUpdate } = await createNewMessage({ ...messageData, creator: user.id });
      global.io
        .to(`room:${roomUpdate._id}`)
        .emit('sendMessageResponse', newMessage, roomUpdate, () => callback && callback(newMessage, roomUpdate));
    } catch (error) {
      // TODO emit send message faild
    }
  });
};

module.exports = {
  connection,
};
