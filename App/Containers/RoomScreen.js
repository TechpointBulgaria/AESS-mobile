import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import RoomActions, { RoomSelectors } from '../Redux/RoomRedux'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from './Styles/RoomScreenStyle'

class RoomScreen extends Component {
  getCurrentRoom(id) {
    const { rooms } = this.props
    return rooms.filter(room => room.id === id)[0]
  }
  render() {
    const room = this.getCurrentRoom(this.props.id)
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text>{JSON.stringify(room)}</Text>
          <Text>RoomScreen</Text>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  rooms: RoomSelectors.getRooms(state)
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(RoomActions.roomRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)
