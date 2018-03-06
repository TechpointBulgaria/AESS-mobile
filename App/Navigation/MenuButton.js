import React from 'react'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

const MenuButton = ({ navigation }) => (
  <Icon name="menu" onPress={() => navigation.navigate('DrawerOpen')} />
)

export default withNavigation(MenuButton)
