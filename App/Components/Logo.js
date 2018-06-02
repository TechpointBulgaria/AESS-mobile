import React from 'react'
import { Image } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'

const style = {
  color: Colors.app.white,
  fontSize: 40,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 40,
  backgroundColor: 'transparent'
}

const Logo = () => (
  <Image
    source={Images.logo}
    style={{
      width: Metrics.screenWidth * 0.9,
      height: 80,
      alignSelf: 'center'
    }}
  />
)

export default Logo
