import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux'

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

  constructor() {
    super()
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
  }

  handleLoginClick() {
    const { login } = this.props
    login(this.state)
    console.log(this.state)
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

  render() {
    const { isFetching, error, token } = this.props
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <FormLabel>Username</FormLabel>
          <FormInput onChangeText={this.handleChangeUsername} />
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={this.handleChangePassword} />
          {error ? (
            <FormValidationMessage>
              Wrong username or password!
            </FormValidationMessage>
          ) : null}
          <Button
            title="Login"
            onPress={this.handleLoginClick}
            loading={isFetching}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: LoginSelectors.isFetching(state),
  error: LoginSelectors.getError(state)
})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(LoginActions.loginRequest(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
