import React from 'react'
import { Text } from 'react-native'
import { Fonts, Colors } from '../../Themes'
import Widget from './Widget'

export default ({ sensor }) => (
  <Widget>
    <Text
      style={{
        ...Fonts.style.h4,
        color: Colors.coal
      }}
    >
      Graph
    </Text>
  </Widget>
)
