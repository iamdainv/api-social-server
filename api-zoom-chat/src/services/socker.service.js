const axios = require('axios');
const {checkUserByToken} = require('./user.service')
const {getMessageOfRoom, createNewMessage} = require('./message.service')

require('dotenv').config()

const LIMIT_MESSAGE_RESPONSE = 30;

const connection =  (socket) => {

  const {token, user} = socket.handshake.auth; 
  checkUserByToken(token).then(response => {
    const { user } = response.data.result;
    socket.on('getMessagesOfRooms', (dataChats, callback) => {
      Promise.all([...[...dataChats].map(({id, ...args}) => getMessageOfRoom(id,LIMIT_MESSAGE_RESPONSE, 0))]).then(res => {
        
        socket.emit("getMessagesOfRoomsResponse", dataChats.map((chat,idx) => ({
          ...chat,
          messages: res[idx]
        }) ))
      })
      callback && callback();
    });

  socket.on('sendMessage',async (messageData, callback) => {
    console.log("🚀 ~ file: socker.service.js ~ line 25 ~ socket.on ~ messageData", messageData)
    const newMessage = await createNewMessage({...messageData, creator: user.id})
    callback && callback(newMessage);
  });
  });

}



module.exports = {
  connection: connection,
}
