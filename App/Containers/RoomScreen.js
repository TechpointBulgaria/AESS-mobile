import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  ScrollView
} from 'react-native'
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

  getHistoryDevice(devices) {
    const device = devices.temperatureSensor || devices.humiditySensor
    return device
      ? {
          deviceId: device.deviceId
        }
      : null
  }

  getSecondaryDevices(devices) {
    const knownTypes = [
      DEVICE_TYPES.LIGHT,
      DEVICE_TYPES.MOTION,
      DEVICE_TYPES.CURRENT
    ]
    return devices.filter(({ type }) => knownTypes.includes(type))
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

    if (this.isEmpty(room))
      return (
        <ScreenBackground>
          <NoDevices />
        </ScreenBackground>
      )

    const devices = this.partitionDevices(room)
    const historyDevice = this.getHistoryDevice(devices)
    const { temperatureSensor, humiditySensor } = devices
    const secondaryDevices = this.getSecondaryDevices(room.devices)
    const acController = !!room.commands.length

    // //DEBUG
    // return (
    //   <ScreenBackground>
    //     <ScrollView>
    //       <Text>{JSON.stringify(room, null, 2)}</Text>
    //       <Text>{JSON.stringify(devices, null, 2)}</Text>
    //       <Text>{JSON.stringify(historyDevice, null, 2)}</Text>
    //       <Text>{JSON.stringify(secondaryDevices, null, 2)}</Text>
    //     </ScrollView>
    //   </ScreenBackground>
    // )

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
        {secondaryDevices.length > 0 && (
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
