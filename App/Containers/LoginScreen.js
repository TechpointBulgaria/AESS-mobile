import React, { Component } from 'react'
import { Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux'
import ScreenBackground from '../Components/ScreenBackground'
import Logo from '../Components/Logo'
import { Colors, Metrics } from '../Themes'

import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  state = {
    email: '',
    password: ''
  }

  static navigationOptions = {
    title: 'Login'
  }

  constructor() {
    super()
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
  }

  handleLoginClick() {
    const { login } = this.props
    login(this.state)
  }

  handleChangeUsername(value) {
    this.setState({
      email: value.toLowerCase()
    })
  }

  handleChangePassword(value) {
    this.setState({
      password: value.toLowerCase()
    })
  }

  navigateIfLoggedIn(newProps) {
    const { navigation } = this.props
    if (this.props.isLoggedIn || (newProps && newProps.isLoggedIn))
      navigation.navigate('App')
  }

  feedbackIfError(newProps) {
    if (newProps.error) {
      this.refs.password.shake()
      this.refs.username.shake()
    }
  }

  componentDidMount() {
    this.props.clearError()
    this.navigateIfLoggedIn()
  }

  componentWillReceiveProps(nextProps) {
    this.navigateIfLoggedIn(nextProps)
    this.feedbackIfError(nextProps)
  }

  render() {
    const { isFetching } = this.props
    return (
      <ScreenBackground>
        <KeyboardAvoidingView behavior="position">
          <Logo />
          <FormLabel labelStyle={styles.label}>Username</FormLabel>
          <FormInput
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={this.handleChangeUsername}
            onSubmitEditing={() => this.refs.password.focus()}
            returnKeyType="next"
            ref="username"
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
          />
          <FormLabel labelStyle={styles.label}>Password</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            onChangeText={this.handleChangePassword}
            onSubmitEditing={this.handleLoginClick}
            ref="password"
            returnKeyType="go"
            secureTextEntry
            inputStyle={styles.input}
          />
          <Button
            style={styles.loginButton}
            title="Login"
            onPress={this.handleLoginClick}
            loading={isFetching}
            buttonStyle={styles.loginButtonInner}
            textStyle={styles.loginButtonText}
          />
        </KeyboardAvoidingView>
      </ScreenBackground>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: LoginSelectors.isLoggedIn(state),
  isFetching: LoginSelectors.isFetching(state),
  error: LoginSelectors.getError(state)
})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(LoginActions.loginRequest(credentials)),
  clearError: () => dispatch(LoginActions.clearError())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
