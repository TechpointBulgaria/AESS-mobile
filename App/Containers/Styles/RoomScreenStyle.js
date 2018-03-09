import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.frost,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.padding
  }
})
