import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { Colors, Metrics } from '../../Themes'
import Svg, { Rect, Circle } from 'react-native-svg'

const width = Metrics.screenWidth - 40
const height = 180
const sumH = height * 0.35
const batH = height * 0.75

const makeInterpolate = (min, max) => value => {
  const maxDiff = max - min
  const diff = value - min
  if (value <= min) return 0
  if (value >= max) return 100
  return (diff / maxDiff) * 100
}

const interpolatePercent = makeInterpolate(0, 100)
const interpolateBat = makeInterpolate(3, 4.2)
const interpolateColor = makeInterpolate(0, 50)

const getColor = (interpolateFunction, value) => {
  const v = interpolateFunction(value)
  if (v < 50) {
    const green = parseInt((interpolateColor(v) * 255) / 100)
    return `rgb(255, ${green},0)`
  } else {
    const red = 255 - parseInt((interpolateColor(v - 50) * 255) / 100)
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
    value: 3.82,
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
      height: sumH,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Text
      style={{
        backgroundColor: 'transparent',
        color: Colors.app.white,
        fontSize: Metrics.screenHeight / 28
      }}
    >
      Battery
    </Text>
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

const calculateRect = (i, n, parentW, parentH, value) => {
  const itemW = parentW / n
  const height = Math.max(4, (interpolateBat(value) * parentH * 0.8) / 100)
  return {
    x: itemW * i,
    y: parentH - height,
    width: parentW / n - 4,
    height
  }
}

const Bat = ({ value, rect }) => (
  <Rect {...rect} fill={getColor(interpolateBat, value)} />
)

export default ({ device }) => {
  const state = device.state instanceof Array ? device.state : defaultState

  const summary = parseInt(
    interpolateBat(state.reduce((x, y) => x + y.value, 0) / state.length)
  )

  return (
    <View height={height} width={width}>
      <Summary color={getColor(interpolatePercent, summary)}>{summary}</Summary>
      <Svg
        style={{
          height: batH,
          width
        }}
      >
        {state.map((item, i) => (
          <Bat
            key={i}
            value={item.value}
            rect={calculateRect(i, state.length, width, batH, item.value)}
          />
        ))}
      </Svg>
    </View>
  )
}
