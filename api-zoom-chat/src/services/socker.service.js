const axios = require('axios');
const {checkUserByToken} = require('./user.service')
const {getMessageOfRoom, createNewMessage} = require('./message.service')

require('dotenv').config()

const LIMIT_MESSAGE_RESPONSE = 30;

const connection =  (socket) => {

  const {token, user} = socket.handshake.auth; 
  socket.on('getMessagesOfRooms', (dataChats, callback) => {
    Promise.all([...[...dataChats].map(({id, ...args}) => getMessageOfRoom(id,LIMIT_MESSAGE_RESPONSE, 0))]).then(res => {

      dataChats.forEach(({id}) => {
        socket.join(`room:${id}`);
      });
      socket.emit("getMessagesOfRoomsResponse", dataChats.map((chat,idx) => ({
        ...chat,
        messages: res[idx]
      })));

    callback && callback();
    });
  });

  socket.on('sendMessage',async (messageData, callback) => {
    try{
      const {newMessage, roomUpdate} = await createNewMessage({...messageData, creator: user.id});
      global.io.to(`room:${roomUpdate._id}`).emit("sendMessageResponse", newMessage, roomUpdate);
      // callback && callback(newMessage, roomUpdate);
    }catch(error){
      //TODO emit send message faild
    }
  });
}



module.exports = {
  connection: connection,
}
