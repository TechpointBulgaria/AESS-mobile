import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableHighlightStatic
} from 'react-native'
import { Colors, Metrics } from '../../Themes'
import Widget from './Widget'

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
    fontSize: Metrics.screenHeight / 28,
    color: Colors.frost
  },
  value: {
    color: Colors.app.white,
    fontWeight: 'bold',
    fontSize: Metrics.screenHeight / 28
  }
})

const HumiditySensor = ({ sensor, onPress }) => (
  <Widget flex={1}>
    <TouchableOpacity
      onPress={() => onPress(sensor.deviceId, sensor.type)}
      activeOpacity={Metrics.activeOpacity}
    >
      <Text style={styles.text}>
        Humidity:
        <Text style={styles.value}>{sensor.state}%</Text>
      </Text>
    </TouchableOpacity>
  </Widget>
)

export default HumiditySensor
