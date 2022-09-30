const events = require('../constants/_events')
const makeConnect = require('./connection')
const makeDisConnect = require('./disconnect')
const makeJoinRooms = require('./joinRooms')
const makeGetRoomData = require('./getRoomData')

module.exports = (wsEventEmitter) => {
  const connection = makeConnect({ wsEventEmitter })
  const disconnect = makeDisConnect({ wsEventEmitter, events })
  const joinRooms = makeJoinRooms({ wsEventEmitter, events })
  const getRoomData = makeGetRoomData({ wsEventEmitter, events })

  const peerMessage = (payload) => {
    console.log(payload, '+++__+++')
    wsEventEmitter.emit(events.peerMessaged, payload)
  }

  return { connection, disconnect, joinRooms, getRoomData, peerMessage }
}
