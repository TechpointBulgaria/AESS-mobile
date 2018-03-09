import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { Metrics } from '../../Themes'

const styles = {}

export default ({ sensor }) => {
  console.log(sensor)
  return (
    <View
      style={{
        width: 50,
        height: 50
      }}
    >
      <Icon
        style={{
          width: Metrics.icons.xl,
          height: Metrics.icons.xl
        }}
        type="font-awesome"
        name="thermometer-half"
      />
      <Text>{sensor.state}</Text>
    </View>
  )
}
