import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../Themes'

const colors = [Colors.app.dark, Colors.app.light]

const defaultStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

const ScreenBackground = ({ children, style, ...rest }) => {
  return (
    <LinearGradient style={[defaultStyle, style]} colors={colors} {...rest}>
      {children}
    </LinearGradient>
  )
}

export default ScreenBackground
