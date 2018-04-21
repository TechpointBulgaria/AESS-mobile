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
  TemperatureSensor,
  SecondaryDevices
} from '../Components/devices'
import GraphContainer from './GraphContainer'
import HistoryActions from '../Redux/HistoryRedux'
import { DEVICE_TYPES } from '../Constants'

// Styles
import styles from './Styles/RoomScreenStyle'

class RoomScreen extends Component {
  componentWillMount() {
    const { room, selectDevice } = this.props
    const historyDevice = this.getHistoryDevice(this.partitionDevices(room))
    historyDevice && selectDevice(historyDevice.deviceId)
  }

  getTemperatureSensor(room) {
    return room.devices.filter(d => d.type === 'T')[0]
  }

  getHistoryDevice(devices) {
    const device = devices.temperatureSensor || devices.humiditySensor
    return device
      ? {
          deviceId: device.deviceId
        }
      : null
  }

  getSecondaryDevices(devices) {
    console.log('getsede', devices)
    return devices.filter(
      ({ type }) => type === DEVICE_TYPES.LIGHT || type === DEVICE_TYPES.MOTION
    )
  }

  isEmpty(room) {
    return room.devices.length === 0
  }

  partitionDevices(room) {
    return room.devices.reduce(
      (obj, device) => ({
        ...obj,
        [{
          [DEVICE_TYPES.TEMPERATURE]: 'temperatureSensor',
          S: 'acController',
          [DEVICE_TYPES.HUMIDITY]: 'humiditySensor',
          [DEVICE_TYPES.LIGHT]: 'lightSensor',
          [DEVICE_TYPES.MOTION]: 'motionSensor'
        }[device.type]]: device
      }),
      {}
    )
  }

  render() {
    const { room, onPower, onMode, onPlus, onMinus, selectDevice } = this.props

    // //DEBUG
    // return (
    //   <ScreenBackground>
    //     <Text>{JSON.stringify(room, null, 2)}</Text>
    //   </ScreenBackground>
    // )

    if (this.isEmpty(room))
      return (
        <ScreenBackground>
          <NoDevices />
        </ScreenBackground>
      )

    const devices = this.partitionDevices(room)
    const historyDevice = this.getHistoryDevice(devices)
    const { temperatureSensor, humiditySensor, acController } = devices
    const secondaryDevices = this.getSecondaryDevices(room.devices)
    console.log('sd', secondaryDevices)

    return (
      <ScreenBackground style={styles.container}>
        {/* <KeyboardAvoidingView behavior="position"> */}
        {temperatureSensor && (
          <TemperatureSensor
            onPress={selectDevice}
            sensor={temperatureSensor}
          />
        )}
        {humiditySensor && (
          <HumiditySensor onPress={selectDevice} sensor={humiditySensor} />
        )}
        {historyDevice && <GraphContainer />}
        {secondaryDevices.length && (
          <SecondaryDevices devices={secondaryDevices} />
        )}
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

const mapStateToProps = (state, props) => ({
  room: RoomSelectors.getRoomFancy(props.id, state)
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
