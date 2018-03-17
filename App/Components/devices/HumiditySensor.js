import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableHighlightStatic
} from 'react-native'
import { Colors } from '../../Themes'
import Widget from './Widget'

const styles = StyleSheet.create({
  text: {
    color: Colors.app.white,
    fontSize: 30,
    backgroundColor: 'transparent'
  }
})

const HumiditySensor = ({ sensor }) => (
  <Widget flex={1}>
    <TouchableOpacity>
      <Text style={styles.text}>Humidity: {sensor.state}%</Text>
    </TouchableOpacity>
  </Widget>
)

export default HumiditySensor
