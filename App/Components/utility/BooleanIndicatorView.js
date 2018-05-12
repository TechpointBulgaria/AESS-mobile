import React from 'react'
import { View } from 'react-native'
import { Colors } from '../../Themes'
import { Icon } from 'react-native-elements'

const BooleanIndicatorView = ({ state, children }) => (
  <View style={{ flex: 1, alignSelf: 'stretch' }}>
    <View
      style={{
        position: 'absolute',
        padding: 3
      }}
    >
      <Icon
        size={10}
        type="font-awesome"
        name="circle"
        color={state ? Colors.app.success : Colors.app.muted}
      />
    </View>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </View>
  </View>
)

export default BooleanIndicatorView
