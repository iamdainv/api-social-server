const axios = require('axios');
const {checkUserByToken} = require('./user.service')
const {getMessageOfRoom} = require('./message.service')

require('dotenv').config()

const connection =  (socket) => {

  const {token} = socket.handshake.auth; 
  checkUserByToken(token).then(response => {
    const { user } = response.data.result;

    socket.on('getMessagesOfRooms', (dataChats) => {

      Promise.all([...[...dataChats].map(({id, ...args}) => getMessageOfRoom(id,20, 0))]).then(res => {
        
        socket.emit("getMessagesOfRoomsResponse", dataChats.map((chat,idx) => ({
          ...chat,
          messages: res[idx]
        }) ))
      })

    });

  })
}



module.exports = {
  connection: connection,
}
