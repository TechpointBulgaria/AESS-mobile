import React from 'react'
import { connect } from 'react-redux'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import MenuButton from './MenuButton'
import RoomScreen from '../Containers/RoomScreen'
import DrawerContent from './DrawerContent'

const createRoomStack = ({ name, id }) => ({
  [name]: StackNavigator({
    RoomScreen: {
      screen: rest => <RoomScreen id={id} {...rest} />,
      navigationOptions: {
        title: name,
        headerLeft: <MenuButton />
      }
    },
    initialRouteName: 'RoomScreen'
  })
})

const Drawer = ({ rooms }) => {
  const drawerItems = rooms.reduce(
    (all, room) => ({
      ...all,
      ...createRoomStack(room)
    }),
    {}
  )

  const Nav = DrawerNavigator(drawerItems, {
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: 'red',
      onItemPress: route => {
        console.log('hi')
      }
    }
  })
  return <Nav />
}

const mapStateToProps = state => ({ rooms: state.rooms.data })

export default connect(mapStateToProps)(Drawer)
