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
    color: Colors.app.white,
    fontSize: 30,
    backgroundColor: 'transparent'
  }
})

const HumiditySensor = ({ sensor, onPress }) => (
  <Widget flex={1}>
    <TouchableOpacity
      onPress={() => onPress(sensor.deviceId)}
      activeOpacity={Metrics.activeOpacity}
    >
      <Text style={styles.text}>Humidity: {sensor.state}%</Text>
    </TouchableOpacity>
  </Widget>
)

export default HumiditySensor
