import React from 'react'
import { View, Text } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes'
import Widget from './Widget'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native'

const colors = [
  '#252525',
  '#525252',
  '#737373',
  '#969696',
  '#bdbdbd',
  '#d9d9d9',
  '#f0f0f0'
]

const charcoal = '#252525'
// *
// * Typography
// *
const sansSerif =
  "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif"
const letterSpacing = 'normal'
const fontSize = 12
// *
// * Layout
// *
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors
}
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: Colors.app.white,
  stroke: 'transparent'
}

const centeredLabelStyles = { ...baseLabelStyles, textAnchor: 'middle' }
// *
// * Strokes
// *
const strokeLinecap = 'round'
const strokeLinejoin = 'round'

const theme = {
  area: {
    ...baseProps,
    style: {
      data: {
        fill: charcoal
      },
      labels: centeredLabelStyles
    }
  },
  axis: {
    ...baseProps,
    style: {
      axis: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: { ...centeredLabelStyles, stroke: 'white', padding: 25 },
      grid: {
        fill: 'none',
        stroke: 'none',
        pointerEvents: 'painted'
      },
      ticks: {
        fill: 'transparent',
        size: 1,
        stroke: 'transparent'
      },
      tickLabels: baseLabelStyles
    }
  },
  bar: {
    ...baseProps,
    style: {
      data: {
        fill: charcoal,
        padding: 8,
        strokeWidth: 0
      },
      labels: baseLabelStyles
    }
  },
  candlestick: {
    ...baseProps,
    style: {
      data: {
        stroke: charcoal,
        strokeWidth: 1
      },
      labels: centeredLabelStyles
    },
    candleColors: {
      positive: '#ffffff',
      negative: charcoal
    }
  },
  chart: baseProps,
  errorbar: {
    ...baseProps,
    borderWidth: 8,
    style: {
      data: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 2
      },
      labels: centeredLabelStyles
    }
  },
  group: {
    ...baseProps,
    colorScale: colors
  },
  line: {
    ...baseProps,
    style: {
      data: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 2
      },
      labels: centeredLabelStyles
    }
  },
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: 'transparent',
        strokeWidth: 1
      },
      labels: { ...baseLabelStyles, padding: 20 }
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 50
  },
  scatter: {
    ...baseProps,
    style: {
      data: {
        fill: charcoal,
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: centeredLabelStyles
    }
  },
  stack: {
    ...baseProps,
    colorScale: colors
  },
  tooltip: {
    style: { ...centeredLabelStyles, padding: 5, pointerEvents: 'none' },
    flyoutStyle: {
      stroke: charcoal,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none'
    },
    cornerRadius: 5,
    pointerLength: 10
  },
  voronoi: {
    ...baseProps,
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: { ...centeredLabelStyles, padding: 5, pointerEvents: 'none' },
      flyout: {
        stroke: charcoal,
        strokeWidth: 1,
        fill: '#f0f0f0',
        pointerEvents: 'none'
      }
    }
  },
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle'
      },
      labels: baseLabelStyles,
      title: { ...baseLabelStyles, padding: 5 }
    }
  }
}

export default ({ sensor }) => (
  // <Widget flex={3}>
  //   {/* <VictoryChart
  //     theme={theme}
  //     padding={{
  //       top: 50,
  //       right: 20,
  //       bottom: 60,
  //       left: 50
  //     }}
  //     width={Metrics.screenWidth}
  //     height={180}
  //     style={{
  //       parent: {
  //         backgroundColor: Colors.app.transparent
  //         // borderWidth: 1,
  //         // borderColor: Colors.app.dark
  //       }
  //     }}
  //     domainPadding={{ x: [0, 0], y: [5, 5] }}
  //   // theme={VictoryTheme.material}
  //   > */}
  //   <View
  //     style={{
  //       backgroundColor: Colors.app.transparent,
  //       height: Metrics.screenWidth / 2,
  //       alignItems: 'center',
  //       justifyContent: 'center'
  //     }}
  //   >
  //   </View>
  //   {/* </VictoryChart> */}
  // </Widget>
  <VictoryLine
    interpolation="monotoneX"
    data={sensor}
    height={Metrics.screenWidth / 2}
    style={{
      data: {
        stroke: Colors.app.white,
        strokeWidth: '2'
      }
    }}
  />
)
