import React from 'react'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { ScrollView, View, Text } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Images } from '../Themes'
import { Avatar } from 'react-native-elements'
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

const DrawerContent = ({ username, navigation, logout, ...rest }) => (
  <View style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView forceInjet={{ top: 'always', horizontal: 'never' }}>
        <View
          style={{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: Colors.border,
            borderBottomWidth: 1
          }}
        >
          <Avatar
            medium
            rounded
            source={Images.avatar}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <Text>{username}</Text>
        </View>
        <DrawerItems navigation={navigation} {...rest} />
      </SafeAreaView>
    </ScrollView>

    <View
      style={{
        borderTopColor: Colors.border,
        borderTopWidth: 1,
        padding: Metrics.doubleBaseMargin,
        height: 55
      }}
    >
      <Text
        style={{
          fontWeight: 'bold'
        }}
        onPress={() => {
          logout()
          navigation.navigate('LoginScreen')
        }}
      >
        Logout
      </Text>
    </View>
  </View>
)

const mapStateToProps = state => ({
  username: LoginSelectors.username(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(LoginActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withNavigation(DrawerContent)
)
