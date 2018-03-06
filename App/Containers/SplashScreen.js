import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import SplashActions, { SplashSelectors } from '../Redux/SplashRedux'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from './Styles/SplashScreenStyle'

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
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text>Splash Screen</Text>
        </KeyboardAvoidingView>
      </View>
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
