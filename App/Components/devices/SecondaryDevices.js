import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import Widget from './Widget'
import { Colors, Fonts } from '../../Themes'
import { DEVICE_TYPES } from '../../Constants'
import Blink from '../Animated/Blink'

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

const BinarySensor = ({ device, icon, title }) => {
  const state = Number(device.state)
  return (
    <View style={styles.device}>
      <Text style={styles.title}>{title}</Text>
      {state ? <Blink>{icon}</Blink> : icon}
    </View>
  )
}
const LightSensor = ({ device }) => {
  const state = Number(device.state)
  const color = state ? Colors.app.white : Colors.ricePaper
  const iconName = state ? 'lightbulb-on' : 'lightbulb-outline'
  return (
    <BinarySensor
      device={device}
      title={'Light'}
      icon={<Icon color={color} name={iconName} type="material-community" />}
    />
  )
}

const MotionSensor = ({ device }) => {
  const state = Number(device.state)
  const color = state ? Colors.app.white : Colors.frost
  const iconName = state ? 'radiobox-marked' : 'radiobox-blank'
  return (
    <BinarySensor
      device={device}
      title={'Motion'}
      icon={<Icon color={color} name={iconName} type="material-community" />}
    />
  )
}

const CurrentSensor = ({ device }) => (
  <View style={styles.device}>
    <Text style={styles.title}>Current</Text>
    <Text
      style={{
        color: Colors.app.white,
        backgroundColor: Colors.transparent,
        fontSize: Fonts.size.h6
      }}
    >
      {device.state} V
    </Text>
  </View>
)

const createDevice = (device, i) => {
  console.log(device)
  return {
    [DEVICE_TYPES.MOTION]: <MotionSensor key={i} device={device} />,
    [DEVICE_TYPES.LIGHT]: <LightSensor key={i} device={device} />,
    [DEVICE_TYPES.CURRENT]: <CurrentSensor key={i} device={device} />
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
