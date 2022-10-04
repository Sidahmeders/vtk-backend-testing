const events = require('../constants/_events')
const makeConnect = require('./connection')
const makeDisConnect = require('./disconnect')
const makeGetRoomData = require('./getRoomData')

module.exports = (wsEventEmitter) => {
  const connection = makeConnect({ wsEventEmitter })
  const disconnect = makeDisConnect({ wsEventEmitter, events })
  const getRoomData = makeGetRoomData({ wsEventEmitter, events })
  
  const peerJoin = (userId) => {
    console.log('Join Room with user-id: ', userId)
    wsEventEmitter.joinSocketRooms(userId)
  }

  const peerMessage = (payload) => {
    console.log(payload, 'PEER:MESSAGE')
    const { friendId } = payload
    wsEventEmitter.sendToRoom(friendId, events.peerMessaged, payload)
    wsEventEmitter.emit(events.peerMessaged, payload)
  }

  return { connection, disconnect, peerJoin, getRoomData, peerMessage }
}
