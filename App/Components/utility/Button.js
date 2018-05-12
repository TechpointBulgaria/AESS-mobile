import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { Colors, Metrics } from '../../Themes'

const Button = ({ onPress, children, loading }) => {
  return (
    <TouchableOpacity
      activeOpacity={Metrics.activeOpacity}
      disabled={loading}
      style={{
        backgroundColor: Colors.app.dark,
        flex: 1,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        margin: 2,
        borderRadius: 5,
        borderWidth: 1.4,
        borderColor: 'black'
      }}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator animating={true} color={Colors.app.white} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
export default Button
