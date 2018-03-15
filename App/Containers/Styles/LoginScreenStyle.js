import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.app.light,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    color: Colors.app.white,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 40
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
    width: Metrics.screenWidth - 50
  },
  inputContainer: {},
  label: {
    color: Colors.app.white
  }
})
