import { StackNavigator } from 'react-navigation'
import RoomScreen from '../Containers/RoomScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    RoomScreen: { screen: RoomScreen },
    LoginScreen: { screen: LoginScreen },
    LaunchScreen: { screen: LaunchScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default PrimaryNav
