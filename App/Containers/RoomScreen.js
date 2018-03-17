import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
import RoomActions, { RoomSelectors } from '../Redux/RoomRedux'
import { NavigationActions } from 'react-navigation'
import ScreenBackground from '../Components/ScreenBackground'
import {
  ACController,
  HumiditySensor,
  NoDevices,
  TemperatureSensor
} from '../Components/devices'
import GraphContainer from './GraphContainer'
import HistoryActions from '../Redux/HistoryRedux'

// Styles
import styles from './Styles/RoomScreenStyle'

class RoomScreen extends Component {
  componentWillMount() {
    const room = this.getCurrentRoom()
    const { selectDevice } = this.props
    const ts = room.devices.filter(d => d.type === 'T')[0]
    selectDevice(ts.id)
  }

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
    const { onPower, onMode, onPlus, onMinus, selectDevice } = this.props
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
        {temperatureSensor && (
          <TemperatureSensor
            onPress={selectDevice}
            sensor={temperatureSensor}
          />
        )}
        <HumiditySensor
          onPress={selectDevice}
          sensor={{
            id: 99,
            state: 77
          }}
        />
        <GraphContainer />
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
  onMinus: () => alert('minus'),
  selectDevice: id => dispatch(HistoryActions.historySelectDevice(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)
