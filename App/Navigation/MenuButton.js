import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { Metrics } from '../Themes'

const MenuButton = ({ navigation }) => (
  <View
    style={{
      padding: Metrics.padding
    }}
  >
    <Icon name="menu" onPress={() => navigation.navigate('DrawerOpen')} />
  </View>
)

export default withNavigation(MenuButton)
