const WebSocketAdapter = require('./WebSocketAdapter')
const listeners = require('./constants/_listeners')
const eventHandlers = require('./eventsHandlers')

const eventsListeners = (ws, socket) => {
  const wsEventEmitter = new WebSocketAdapter(ws, socket)
  const wsEventHandler = eventHandlers(wsEventEmitter)

  wsEventHandler.connection()
  wsEventEmitter.on(listeners.disconnect, wsEventHandler.disconnect)

  console.log('NUMBER OF CLIENTS:', ws.engine.clientsCount)

  wsEventEmitter.on(listeners.peer_join, wsEventHandler.peerJoin)
  wsEventEmitter.on(listeners.peer_message, wsEventHandler.peerMessage)
  wsEventEmitter.on(listeners.room_data, wsEventHandler.getRoomData)
}

function initListener(ws) {
  ws.on('connection', (socket) => eventsListeners(ws, socket))
}

module.exports = initListener
