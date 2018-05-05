import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { connect } from 'react-redux'
import ScreenBackground from '../Components/ScreenBackground'
import { Images, Metrics, Colors } from '../Themes'

import styles from './Styles/AboutScreenStyle'

const label = {
  color: Colors.app.white,
  backgroundColor: Colors.transparent,
  fontSize: 20,
  textAlign: 'center'
}

class AboutScreen extends Component {
  render() {
    return (
      <ScreenBackground>
        <Image
          source={Images.about}
          resizeMethod="scale"
          resizeMode="contain"
          style={{
            width: Metrics.screenWidth * 0.9,
            height: '80%'
          }}
        />
        {/* </View> */}
        <View
          style={{
            height: '20%'
          }}
        >
          <Text style={label}>S/N ACT841A32CE395D</Text>
          <Text style={label}>Active Technology LTD</Text>
        </View>
      </ScreenBackground>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
