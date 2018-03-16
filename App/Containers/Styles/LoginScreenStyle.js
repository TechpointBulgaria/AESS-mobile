import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    color: Colors.app.white,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    backgroundColor: 'transparent'
  },
  errorMessage: {
    height: 80,
    marginTop: 40,
    marginBottom: 40
  },
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
    backgroundColor: 'rgba(255,255,255, 0.1)'
  },
  label: {
    color: Colors.app.white,
    fontSize: 15,
    marginBottom: 5,
    backgroundColor: 'transparent'
  }
})
