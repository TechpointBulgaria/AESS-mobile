import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes'
import Widget from './Widget'

export default ({ sensor, onPress, setTemp }) => (
  <Widget flex={3}>
    <TouchableOpacity
      onPress={() => onPress(sensor.deviceId, sensor.type)}
      activeOpacity={Metrics.activeOpacity}
    >
      <View
        style={{
          width: Metrics.screenWidth / 2,
          height: Metrics.screenWidth / 2,
          borderRadius: Metrics.screenWidth / 4,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: Colors.app.white,
          backgroundColor: Colors.app.transparent
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 60,
            color: Colors.app.white,
            backgroundColor: Colors.transparent
          }}
        >
          {sensor.state}°C
        </Text>
        <Text
          style={{
            color: Colors.app.white,
            backgroundColor: Colors.transparent
          }}
        >
          {setTemp}
        </Text>
      </View>
    </TouchableOpacity>
  </Widget>
)
