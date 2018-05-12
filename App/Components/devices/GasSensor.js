import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { Colors } from '../../Themes'

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    backgroundColor: 'transparent',
    color: Colors.app.white,
    marginRight: 10
  }
})

export default ({ device }) => {
  const { state } = device
  const color = state ? Colors.error : Colors.app.dark

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Gas</Text>
      <Icon color={color} name={'fire'} type={'simple-line-icon'} />
    </View>
  )
}
