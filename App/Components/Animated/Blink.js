import React, { Component } from 'react'
import { Animated } from 'react-native'

const defaultDuration = 800
const defaultDelay = 800

export default class Blink extends Component {
  state = {
    fadeAnim: new Animated.Value(1)
  }
  componentDidMount() {
    const duration = this.props.duration || defaultDuration
    const delay = this.props.delay || defaultDelay
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(this.state.fadeAnim, {
          toValue: 0,
          duration
        }),
        Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration
        })
      ])
    ).start()
  }
  render() {
    const { device, children } = this.props
    return (
      <Animated.View
        style={{
          opacity: this.state.fadeAnim
        }}
      >
        {children}
      </Animated.View>
    )
  }
}
