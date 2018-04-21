import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import Widget from './Widget'
import { Colors } from '../../Themes'
import { DEVICE_TYPES } from '../../Constants'

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  device: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    backgroundColor: 'transparent',
    color: Colors.app.white,
    marginRight: 10
  }
})

const MotionSensor = ({ device }) => (
  <View style={styles.device}>
    <Text style={styles.title}>Motion</Text>
    <Icon
      color={Colors.app.white}
      name={Number(device.state) ? 'radiobox-marked' : 'radiobox-blank'}
      type="material-community"
    />
  </View>
)

const LightSensor = ({ device }) => (
  <View style={styles.device}>
    <Text style={styles.title}>Light</Text>
    <Icon
      color={Colors.app.white}
      name={Number(device.state) ? 'lightbulb-on' : 'lightbulb-outline'}
      type="material-community"
    />
  </View>
)

const createDevice = (device, i) => {
  console.log(device)
  return {
    [DEVICE_TYPES.MOTION]: <MotionSensor key={i} device={device} />,
    [DEVICE_TYPES.LIGHT]: <LightSensor key={i} device={device} />
  }[device.type]
}

const SecondaryDevices = ({ devices }) => {
  return (
    <Widget flex={1}>
      <View style={styles.view}>{devices.map(createDevice)}</View>
    </Widget>
  )
}

export default SecondaryDevices
