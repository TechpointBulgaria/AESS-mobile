import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  Switch,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Icon } from 'react-native-elements'
import Widget from './Widget'
import { Colors, Fonts, Metrics } from '../../Themes'
import { DEVICE_TYPES } from '../../Constants'
import Blink from '../Animated/Blink'
import Button from '../utility/Button'
import BooleanIndicatorView from '../utility/BooleanIndicatorView'
import { connect } from 'react-redux'
import SwitchActions from '../../Redux/SwitchRedux'
import GasSensor from './GasSensor'

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  device: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  deviceHorizontal: {
    flex: 1
  },
  deviceVertical: {
    alignSelf: 'stretch',
    height: Metrics.screenHeight / 6
  },
  title: {
    backgroundColor: 'transparent',
    color: Colors.app.white
  },
  titleHorizontal: {
    marginRight: 10
  },
  titleVertical: {
    fontSize: Metrics.screenHeight / 28,
    textDecorationLine: 'underline',
    color: Colors.frost,
    marginBottom: 5
  },
  horizontal: {
    flexDirection: 'row'
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})

const LightSensor = ({ device, vertical }) => {
  const state = Number(device.state)
  const color = state ? 'yellow' : Colors.app.dark
  const iconName = state ? 'lightbulb-on' : 'lightbulb-outline'
  const viewStyle = [
    styles.device,
    vertical ? styles.deviceVertical : styles.deviceHorizontal,
    vertical ? styles.vertical : styles.horizontal
  ]
  const titleStyle = [
    styles.title,
    vertical ? styles.titleVertical : styles.titleHorizontal
  ]
  return (
    <View style={viewStyle}>
      <Text style={titleStyle}>Light</Text>
      <Icon color={color} name={iconName} type="material-community" />
    </View>
  )
}

const MotionSensor = ({ device, vertical }) => {
  const state = Number(device.state)
  const color = state ? Colors.app.success : Colors.app.dark
  const iconName = state ? 'radiobox-marked' : 'radiobox-blank'
  const viewStyle = [
    styles.device,
    vertical ? styles.deviceVertical : styles.deviceHorizontal,
    vertical ? styles.vertical : styles.horizontal
  ]
  const titleStyle = [
    styles.title,
    vertical ? styles.titleVertical : styles.titleHorizontal
  ]
  return (
    <View style={viewStyle}>
      <Text style={titleStyle}>Motion</Text>
      <Icon color={color} name={iconName} type="material-community" />
    </View>
  )
}

const CurrentSensor = ({ device, vertical }) => (
  <View
    style={[
      styles.device,
      vertical ? styles.deviceVertical : styles.deviceHorizontal,
      vertical ? styles.vertical : styles.horizontal
    ]}
  >
    <Text
      style={[
        styles.title,
        vertical ? styles.titleVertical : styles.titleHorizontal
      ]}
    >
      {device.name || 'Current'}
    </Text>
    <Text
      style={{
        color: Colors.app.white,
        backgroundColor: Colors.transparent,
        fontSize: vertical ? Metrics.screenHeight / 25 : Fonts.size.h6,
        fontWeight: vertical ? 'bold' : 'normal'
      }}
    >
      {device.state} {device.unitName || 'V'}
    </Text>
  </View>
)

const _SwitchSensor = ({ device, vertical, onPress }) => (
  <View
    style={[
      styles.device,
      vertical ? styles.deviceVertical : styles.deviceHorizontal,
      vertical ? styles.vertical : styles.horizontal
    ]}
  >
    <Text
      style={[
        styles.title,
        vertical ? styles.titleVertical : styles.titleHorizontal
      ]}
    >
      {device.name}
    </Text>
    <View style={{ width: 80, height: 50 }}>
      <Button
        loading={device.fetching}
        onPress={() => onPress(device.deviceId, device.state !== 'ON')}
      >
        <BooleanIndicatorView state={device.state === 'ON'}>
          <Text style={{ color: Colors.app.white }}>{device.state}</Text>
        </BooleanIndicatorView>
      </Button>
    </View>
  </View>
)

const mdtp = dispatch => ({
  onPress: (id, value) => dispatch(SwitchActions.turnSwitch(id, value))
})

const SwitchSensor = connect(null, mdtp)(_SwitchSensor)

const createDevice = vertical => (device, i) => {
  return {
    [DEVICE_TYPES.MOTION]: (
      <MotionSensor key={i} device={device} vertical={vertical} />
    ),
    [DEVICE_TYPES.LIGHT]: (
      <LightSensor key={i} device={device} vertical={vertical} />
    ),
    [DEVICE_TYPES.CURRENT]: (
      <CurrentSensor key={i} device={device} vertical={vertical} />
    ),
    [DEVICE_TYPES.SWITCH]: (
      <SwitchSensor key={i} device={device} vertical={vertical} />
    ),
    [DEVICE_TYPES.GAS]: (
      <GasSensor key={i} device={device} vertical={vertical} />
    )
  }[device.type]
}

const SecondaryDevices = ({ devices, vertical }) => {
  return (
    <Widget flex={1}>
      <View
        style={[styles.view, vertical ? styles.vertical : styles.horizontal]}
      >
        {devices.map(createDevice(vertical))}
      </View>
    </Widget>
  )
}

export default SecondaryDevices
