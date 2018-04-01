import React from 'react'
import { View, Text } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default ({ flex, children }) => (
  <View
    style={{
      flex,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch'
      // borderWidth: 1
    }}
  >
    {children}
  </View>
)
