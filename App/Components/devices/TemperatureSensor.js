import React from 'react'
import { Text } from 'react-native'
import { Fonts, Colors } from '../../Themes'
import Widget from './Widget'

export default ({ sensor }) => (
  <Widget>
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 60,
        color: Colors.app.white
      }}
    >
      {sensor.state} °C
    </Text>
  </Widget>
)
