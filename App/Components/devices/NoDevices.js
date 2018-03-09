import React from 'react'
import { View, Text } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Text
      style={{
        ...Fonts.style.h4,
        color: Colors.coal
      }}
    >
      No devices.
    </Text>
  </View>
)
