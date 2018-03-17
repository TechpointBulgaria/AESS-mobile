import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  loginButton: {
    marginTop: Metrics.doubleBaseMargin
  },
  loginButtonInner: {
    backgroundColor: Colors.app.dark,
    borderRadius: 4
  },
  loginButtonText: {
    color: Colors.app.white,
    fontWeight: 'bold'
  },
  input: {
    color: Colors.app.white,
    width: Metrics.screenWidth - 50,
    backgroundColor: Colors.app.transparent,
    padding: 5
  },
  label: {
    color: Colors.app.white,
    fontSize: 15,
    marginBottom: 5,
    backgroundColor: 'transparent'
  }
})
