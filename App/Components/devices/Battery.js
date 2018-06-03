import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { Colors, Metrics } from '../../Themes'
import Svg, { Rect, Circle } from 'react-native-svg'

const makeInterpolate = (min, max) => value => {
  const maxDiff = max - min
  const diff = value - min
  if (value <= min) return 0
  if (value >= max) return 100
  return diff / maxDiff * 100
}

const interpolatePercent = makeInterpolate(0, 100)
const interpolateBat = makeInterpolate(3, 4.2)
const interpolateColor = makeInterpolate(0, 50)

const getColor = (interpolateFunction, value) => {
  const v = interpolateFunction(value)
  if (v < 50) {
    const green = parseInt(interpolateColor(v) * 255 / 100)
    return `rgb(255, ${green},0)`
  } else {
    const red = 255 - parseInt(interpolateColor(v - 50) * 255 / 100)
    return `rgb(${red},255,0)`
  }
}

const defaultState = [
  {
    value: 3.8,
    batteryId: 1
  },
  {
    value: 3.9,
    batteryId: 2
  },
  {
    value: 3.51,
    batteryId: 3
  },
  {
    value: 3.71,
    batteryId: 4
  },
  {
    value: 2.82,
    batteryId: 5
  },
  {
    value: 3.85,
    batteryId: 6
  },
  {
    value: 3.52,
    batteryId: 7
  },
  {
    value: 3.91,
    batteryId: 8
  },
  {
    value: 3.32,
    batteryId: 9
  },
  {
    value: 3.53,
    batteryId: 10
  },
  {
    value: 3.51,
    batteryId: 11
  },
  {
    value: 3.51,
    batteryId: 12
  },
  {
    value: 3.62,
    batteryId: 13
  }
]

const Summary = ({ color, children }) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Text
      style={{
        color,
        backgroundColor: Colors.transparent,
        fontSize: Metrics.screenHeight / 25,
        fontWeight: 'bold'
      }}
    >
      {children}%
    </Text>
  </View>
)

const calculateRect = (i, radius, numOfItems, width, height, center) => {
  const angle = i / (numOfItems / 2) * Math.PI
  const x = radius * Math.cos(angle) + center - width / 2
  const y = radius * Math.sin(angle) + center - height / 2
  const origin = `${x + width / 2},${y + height / 2}`
  const rotation = i * (360 / numOfItems) - 90
  return {
    x,
    y,
    width,
    height,
    origin,
    rotation
  }
}

const Bat = ({ value, rect }) => (
  <Rect
    {...rect}
    height={Math.max(4, interpolateBat(value) * 30 / 100)}
    fill={getColor(interpolateBat, value)}
  />
)

export default ({ device }) => {
  const state = device.state || defaultState

  const radius = 80
  const width = radius * 2 + 50
  const xCenter = width / 2
  const summary = parseInt(
    interpolateBat(state.reduce((x, y) => x + y.value, 0) / state.length)
  )

  return (
    <Svg height={width} width={width}>
      <Summary color={getColor(interpolatePercent, summary)}>{summary}</Summary>
      {state.map((item, i) => (
        <Bat
          key={i}
          value={item.value}
          rect={calculateRect(i, radius, state.length, 20, 30, xCenter)}
        />
      ))}
    </Svg>
  )
}
