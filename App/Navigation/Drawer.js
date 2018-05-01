import React from 'react'
import { connect } from 'react-redux'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import MenuButton from './MenuButton'
import RoomScreen from '../Containers/RoomScreen'
import ModesScreen from '../Containers/ModesScreen'
import DrawerContent from './DrawerContent'
import { Colors } from '../Themes'
import { shouldUpdate } from 'recompose'

const createRoomStack = ({ name, id }) => ({
  [id]: StackNavigator({
    RoomScreen: {
      screen: rest => <RoomScreen id={id} {...rest} />,
      navigationOptions: {
        title: name || id,
        headerLeft: <MenuButton />,
        headerTintColor: Colors.app.white,
        headerStyle: {
          backgroundColor: Colors.app.dark
        }
      }
    },
    initialRouteName: 'RoomScreen'
  })
})

const modesStack = StackNavigator({
  ModesScreen: {
    screen: rest => <ModesScreen id={'modes'} {...rest} />,
    navigationOptions: {
      title: 'Modes',
      headerLeft: <MenuButton />,
      headerTintColor: Colors.app.white,
      headerStyle: {
        backgroundColor: Colors.app.dark
      }
    }
  },
  initialRouteName: 'ModesScreen'
})

const enhance = shouldUpdate(
  (props, nextProps) => props.rooms.length !== nextProps.rooms.length
)
const Drawer = enhance(({ rooms }) => {
  const drawerItems = rooms
    .reduce(
      (all, room) => ({
        ...all,
        ...createRoomStack(room)
      }),
      {}
    )
    .merge({ modes: modesStack })

  const Nav = DrawerNavigator(drawerItems, {
    contentComponent: DrawerContent,
    contentOptions: {
      activeBackgroundColor: Colors.app.light,
      inactiveTintColor: Colors.app.white,
      activeTintColor: Colors.app.white
    }
  })
  return <Nav />
})

const mapStateToProps = state => ({ rooms: state.rooms.data })

export default connect(mapStateToProps)(Drawer)
