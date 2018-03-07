import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.frost,
    justifyContent: 'center'
  },
  errorMessage: {
    height: 80,
    marginTop: 40,
    marginBottom: 40
  },
  loginButton: {
    marginTop: Metrics.marginVertical
  }
})
