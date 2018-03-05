import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import RoomActions, { RoomSelectors } from '../Redux/RoomRedux'

// Styles
import styles from './Styles/RoomScreenStyle'

class RoomScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerBackTitle: 'Login'
  }

  componentDidMount() {
    this.props.fetchRooms()
  }

  render() {
    const { rooms } = this.props
    return (
      <View style={styles.container}>
        <Text>{rooms && JSON.stringify(rooms)}</Text>
        <KeyboardAvoidingView behavior="position">
          <Text>RoomScreen</Text>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  rooms: RoomSelectors.getRooms(state)
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(RoomActions.roomRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)
