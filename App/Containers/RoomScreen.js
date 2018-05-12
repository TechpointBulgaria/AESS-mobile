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
import AcActions from '../Redux/AcRedux'
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

  getSecondaryDevices(devices, commands) {
    const knownTypes = [
      DEVICE_TYPES.LIGHT,
      DEVICE_TYPES.MOTION,
      DEVICE_TYPES.CURRENT
    ]

    return devices
      .filter(d => knownTypes.includes(d.type))
      .concat(commands.filter(c => DEVICE_TYPES.SWITCH === c.type))
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
    const {
      room,
      onPower,
      onMode,
      onPlus,
      onMinus,
      selectDevice,
      acController,
      acTemp
    } = this.props

    if (this.isEmpty(room))
      return (
        <ScreenBackground>
          <NoDevices />
        </ScreenBackground>
      )

    const devices = this.partitionDevices(room)
    const historyDevice = this.getHistoryDevice(devices)
    const { temperatureSensor, humiditySensor } = devices
    const secondaryDevices = this.getSecondaryDevices(
      room.devices,
      room.commands
    )

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
            setTemp={acTemp}
          />
        )}
        {humiditySensor && (
          <HumiditySensor onPress={selectDevice} sensor={humiditySensor} />
        )}
        {historyDevice && <GraphContainer />}
        {secondaryDevices.length > 0 && (
          <SecondaryDevices
            devices={secondaryDevices}
            vertical={room.id === 'service' || !temperatureSensor}
          />
        )}
        {acController && (
          <ACController
            sensor={acController}
            onPower={() => onPower(room.id)}
            onMode={() => onMode(room.id)}
            onPlus={() => onPlus(room.id)}
            onMinus={() => onMinus(room.id)}
          />
        )}
        {/* </KeyboardAvoidingView> */}
      </ScreenBackground>
    )
  }
}

const mapStateToProps = (state, props) => ({
  room: RoomSelectors.getRoomFancy(props.id, state),
  acController: (() => {
    const room = RoomSelectors.getRoomFancy(props.id, state)
    const ac = room.commands.reduce((obj, current) => {
      return {
        ...obj,
        ...(current.type === 'AC' || current.type === 'ACSET'
          ? { [current.type]: current }
          : {})
      }
    }, {})
    return ac.AC ? ac : false
  })(),
  acTemp: (() => {
    const room = RoomSelectors.getRoomFancy(props.id, state)
    const acset = room.commands.filter(c => c.type === 'ACSET')[0]
    return acset ? acset.state : 'not set'
  })()
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(RoomActions.roomRequest()),
  onPower: room => dispatch(AcActions.toggleOnOff(room)),
  onMode: room => dispatch(AcActions.toggleMode(room)),
  onPlus: room => dispatch(AcActions.increaseTemperature(room)),
  onMinus: room => dispatch(AcActions.decreaseTemperature(room)),
  selectDevice: id => dispatch(HistoryActions.historySelectDevice(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)
