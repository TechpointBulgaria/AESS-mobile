import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Fonts, Colors, Images, Metrics } from '../../Themes'
import Widget from './Widget'

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
        size={12}
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

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      activeOpacity={Metrics.activeOpacity}
      style={{
        backgroundColor: Colors.app.dark,
        flex: 1,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        margin: 1,
        borderRadius: 4
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

export default ({ sensor, onPower, onMode, onPlus, onMinus }) => (
  // <Widget>
  <View
    style={{
      height: 50,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Button onPress={onPower}>
      <BooleanIndicatorView state={sensor.IRONOFF}>
        <Icon inverse name="power" type="foundation" color={Colors.app.white} />
      </BooleanIndicatorView>
    </Button>
    <Button onPress={onMode}>
      <BooleanIndicatorView state={sensor.IRMODE}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            color: Colors.app.white
          }}
        >
          M
        </Text>
      </BooleanIndicatorView>
    </Button>
    <Button onPress={onMinus}>
      <Icon inverse name="minus" type="entypo" color={Colors.app.white} />
    </Button>
    <Button onPress={onPlus}>
      <Icon inverse name="plus" type="entypo" color={Colors.app.white} />
    </Button>
  </View>
  // </Widget>
)
