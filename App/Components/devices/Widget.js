import React from 'react'
import { View, Text } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default ({ children }) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {children}
  </View>
)
