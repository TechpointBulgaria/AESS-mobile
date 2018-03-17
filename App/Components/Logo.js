import React from 'react'
import { Text } from 'react-native'
import { Colors } from '../Themes'

const style = {
  color: Colors.app.white,
  fontSize: 40,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 40,
  backgroundColor: 'transparent'
}

const Logo = () => <Text style={style}>MQTT Mobile</Text>

export default Logo
