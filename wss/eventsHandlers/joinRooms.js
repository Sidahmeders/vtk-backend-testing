module.exports = ({ wsEventEmitter, events, joinRoom }) => {
  return async (payload) => {
    try {
      wsEventEmitter.broadcastAll(payload)
    } catch (err) {
      wsEventEmitter.emit(events.roomError, err.message)
      console.error(err)
    }
  }
}
