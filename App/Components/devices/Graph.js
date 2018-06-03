import React from 'react'
import { Colors, Metrics } from '../../Themes'
import { VictoryAxis, VictoryLine } from 'victory-native'
import Svg from 'react-native-svg'
import { prop } from 'ramda'

const height = Metrics.screenWidth / 2

const axisStyle = {
  axis: { stroke: Colors.ricePaper },
  grid: { stroke: Colors.ricePaper, strokeWidth: 0.3 },
  ticks: { stroke: Colors.ricePaper, size: 2, strokeWidth: 0.3 },
  tickLabels: {
    fontSize: 12,
    padding: 8,
    fill: Colors.ricePaper
  }
}

const lineStyle = {
  data: {
    stroke: '#80deea',
    strokeWidth: 1.5
  }
}

const duration = 100
const animate = {
  duration,
  onLoad: { duration: duration * 3 }
}

export default ({ sensor }) => {
  const unit = sensor[0].unit
  const values = sensor.map(prop('y'))
  const max = Math.max(...values)
  const median = values[Math.round(values.length / 2)]
  const yDomain = [0, Math.max(median * 2, max)]
  const allXTicks = sensor.map(prop('time'))
  const l = allXTicks.length
  const xTicks = [
    allXTicks[0],
    allXTicks[Math.round(l * 0.3)],
    allXTicks[Math.round(l * 0.6)],
    allXTicks[l - 1]
  ]

  return (
    <Svg height={height}>
      <VictoryAxis
        animate={animate}
        height={height}
        tickValues={xTicks}
        tickCount={3}
        standalone={false}
        style={axisStyle}
      />
      <VictoryAxis
        animate={animate}
        dependentAxis
        crossAxis
        height={height}
        domain={yDomain}
        tickCount={3}
        standalone={false}
        style={axisStyle}
        tickFormat={t => `${t} ${unit}`}
      />
      <VictoryLine
        animate={animate}
        interpolation="monotoneX"
        domain={{ y: yDomain }}
        data={sensor}
        height={height}
        style={lineStyle}
      />
    </Svg>
  )
}
