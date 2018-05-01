import { SwitchNavigator } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
import LoginScreen from '../Containers/LoginScreen'
import Drawer from './Drawer'

import styles from './Styles/NavigationStyles'

export default SwitchNavigator(
  {
    SplashScreen,
    LoginScreen,
    App: Drawer
  },
  {
    initialRouteName: 'SplashScreen'
  }
)
