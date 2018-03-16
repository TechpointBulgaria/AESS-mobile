import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
import RoomActions, { RoomSelectors } from '../Redux/RoomRedux'
import { NavigationActions } from 'react-navigation'
import ScreenBackground from '../Components/ScreenBackground'
import {
  NoDevices,
  TemperatureSensor,
  ACController,
  Graph
} from '../Components/devices'

// Styles
import styles from './Styles/RoomScreenStyle'

class RoomScreen extends Component {
  getCurrentRoom() {
    const { id, rooms } = this.props
    return rooms.filter(room => room.id === id)[0]
  }

  getTemperatureSensor(room) {
    return room.devices.filter(d => d.type === 'T')[0]
  }

  isEmpty(room) {
    return room.devices.length === 0
  }

  partitionDevices(room) {
    return room.devices.reduce(
      (obj, device) => ({
        ...obj,
        [{
          T: 'temperatureSensor',
          S: 'acController'
        }[device.type]]: device
      }),
      {}
    )
  }

  render() {
    const { onPower, onMode, onPlus, onMinus } = this.props
    const room = this.getCurrentRoom()

    if (this.isEmpty(room))
      return (
        <ScreenBackground>
          <NoDevices />
        </ScreenBackground>
      )

    const { temperatureSensor, acController } = this.partitionDevices(room)

    return (
      <ScreenBackground style={styles.container}>
        {/* <KeyboardAvoidingView behavior="position"> */}
        {temperatureSensor && <TemperatureSensor sensor={temperatureSensor} />}
        <Graph />
        {acController && (
          <ACController
            sensor={acController}
            onPower={onPower}
            onMode={onMode}
            onPlus={onPlus}
            onMinus={onMinus}
          />
        )}
        {/* </KeyboardAvoidingView> */}
      </ScreenBackground>
    )
  }
}

const mapStateToProps = state => ({
  rooms: RoomSelectors.getRooms(state)
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(RoomActions.roomRequest()),
  onPower: () => alert('power'),
  onMode: () => alert('mode'),
  onPlus: () => alert('plus'),
  onMinus: () => alert('minus')
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)
