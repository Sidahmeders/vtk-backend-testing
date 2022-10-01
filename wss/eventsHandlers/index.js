const events = require('../constants/_events')
const makeConnect = require('./connection')
const makeDisConnect = require('./disconnect')
const makeGetRoomData = require('./getRoomData')

module.exports = (wsEventEmitter) => {
  const connection = makeConnect({ wsEventEmitter })
  const disconnect = makeDisConnect({ wsEventEmitter, events })
  const getRoomData = makeGetRoomData({ wsEventEmitter, events })
  
  const joinRooms = (payload) => {
    console.log(payload, 'JOIN:ROOM')
    wsEventEmitter.joinSocketRooms(payload.userId)
  }

  const peerMessage = (payload) => {
    console.log(payload, 'PEER:MESSAGE')
    wsEventEmitter.emit(events.peerMessaged, payload)
  }

  return { connection, disconnect, joinRooms, getRoomData, peerMessage }
}
