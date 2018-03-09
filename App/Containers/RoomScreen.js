import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import RoomActions, { RoomSelectors } from '../Redux/RoomRedux'
import { NavigationActions } from 'react-navigation'
import TemperatureSensor from '../Components/devices/TemperatureSensor'

// Styles
import styles from './Styles/RoomScreenStyle'

class RoomScreen extends Component {
  componentWillMount() {
    // this.props.navigation.navigate('DrawerOpen')
  }
  getCurrentRoom() {
    const { id, rooms } = this.props
    return rooms.filter(room => room.id === id)[0]
  }
  getTemperatureSensor(room) {
    return room.devices.filter(d => d.type === 'T')[0]
  }
  render() {
    const room = this.getCurrentRoom()

    const temperatureSensor = this.getTemperatureSensor(room)

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          {temperatureSensor && (
            <TemperatureSensor sensor={temperatureSensor} />
          )}
          <Text>{JSON.stringify(room)}</Text>
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
