module.exports = ({ wsEventEmitter, events }) => {
  return () => {
    try {
      console.log(`user:: ${wsEventEmitter.socket.id} ::disconnected`)
    } catch (err) {
      wsEventEmitter.emit(events.roomError, err.message)
      console.error(err)
    }
  }
}
