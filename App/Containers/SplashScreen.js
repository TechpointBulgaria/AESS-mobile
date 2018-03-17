import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import SplashActions, { SplashSelectors } from '../Redux/SplashRedux'
import { NavigationActions } from 'react-navigation'
import ScreenBackground from '../Components/ScreenBackground'
import Logo from '../Components/Logo'

class SplashScreen extends Component {
  componentDidMount() {
    this.props.init()
  }

  componentWillReceiveProps(newProps) {
    const { isFetching, isLoggedIn, navigation } = newProps

    if (!isFetching) {
      if (isLoggedIn) navigation.navigate('App')
      else navigation.navigate('LoginScreen')
    }
  }

  render() {
    return (
      <ScreenBackground>
        <KeyboardAvoidingView behavior="position">
          <Logo />
        </KeyboardAvoidingView>
      </ScreenBackground>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: SplashSelectors.isFetching(state),
  isLoggedIn: SplashSelectors.isLoggedIn(state)
})
const mapDispatchToProps = dispatch => ({
  init: () => dispatch(SplashActions.splashRequest())
})
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
