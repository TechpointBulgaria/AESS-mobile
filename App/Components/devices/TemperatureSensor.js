import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes'
import Widget from './Widget'

export default ({ sensor }) => (
  <Widget flex={3}>
    <TouchableOpacity activeOpacity={Metrics.activeOpacity}>
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
            backgroundColor: 'transparent'
          }}
        >
          {sensor.state} °C
        </Text>
      </View>
    </TouchableOpacity>
  </Widget>
)
