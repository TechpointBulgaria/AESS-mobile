import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views-native'
import { Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { Colors, Fonts } from '../Themes'
import ScreenBackground from '../Components/ScreenBackground'
import LinearGradient from 'react-native-linear-gradient'

// import styles from './Styles/ModesScreenStyle'

const modes = [
  {
    name: 'Auto',
    description: 'Autonomous mode with optimizing algorithms switched on.',
    active: false
  },
  {
    name: 'Away',
    description: 'Autonomous mode optimized for lower consumption.',
    active: true
  },
  {
    name: 'Override',
    description: 'Only shows sensor data. Does not controll anything.',
    active: false
  }
]

const modeStyles = StyleSheet.create({
  title: {
    fontSize: Fonts.size.h1,
    backgroundColor: Colors.transparent,
    color: Colors.app.white
  },
  container: {
    flex: 1
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row'
  },
  arrowContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'stretch'
  },
  info: {
    textAlign: 'center',
    fontSize: Fonts.size.regular,
    color: Colors.app.white,
    backgroundColor: Colors.transparent
  },
  innerContainer: {
    flex: 6
  },
  buttonInner: {
    backgroundColor: Colors.app.dark,
    borderRadius: 4,
    width: '100%'
  },
  buttonText: {
    color: Colors.app.white,
    fontWeight: 'bold'
  },
  activeText: {
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3,
    color: Colors.app.white
  }
})

const styles = StyleSheet.create({})

const lorem =
  'Phasellus rutrum porttitor diam vitae efficitur. Pellentesque augue lorem, dictum sit amet aliquet eget'

const ModeView = ({ mode, onBack, onForward }) => (
  <View style={[modeStyles.container, modeStyles.horizontal]}>
    <TouchableWithoutFeedback onPress={onBack}>
      <View style={modeStyles.arrowContainer}>
        {/* <Icon
          inverse
          name="arrow-back"
          type="MaterialIcons"
          color={Colors.app.white}
        /> */}
      </View>
    </TouchableWithoutFeedback>
    <View style={modeStyles.innerContainer}>
      <View style={modeStyles.section}>
        <Text style={modeStyles.title}>{mode.name}</Text>
      </View>
      <View style={modeStyles.section}>
        <Text style={[modeStyles.info, modeStyles.padded]}>
          {mode.description}
        </Text>
      </View>
      <View style={modeStyles.section}>
        {mode.active ? (
          <Text style={modeStyles.activeText}>Active</Text>
        ) : (
          <Button
            title="Activate"
            buttonStyle={modeStyles.buttonInner}
            textStyle={modeStyles.buttonText}
          />
        )}
      </View>
    </View>

    <TouchableWithoutFeedback onPress={onForward}>
      <View style={modeStyles.arrowContainer}>
        {/* <Icon
          inverse
          name="arrow-forward"
          type="MaterialIcons"
          color={Colors.app.white}
        /> */}
      </View>
    </TouchableWithoutFeedback>
  </View>
)

const colors = [Colors.app.dark, Colors.app.light]

const defaultStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

class ModesScreen extends Component {
  state = {
    index: 0
  }
  onBack() {
    const { index } = this.state
    if (index === 0) return
    this.setState({ index: index - 1 })
  }
  onForward() {
    const { index } = this.state
    if (index === modes.length - 1) return
    this.setState({ index: index + 1 })
  }
  updateIndex(index) {
    this.setState({ index })
  }
  render() {
    return (
      <ScreenBackground>
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          <SwipeableViews
            index={this.state.index}
            onChangeIndex={this.updateIndex.bind(this)}
          >
            {modes.map((m, i) => (
              <ModeView
                key={i}
                mode={m}
                onBack={this.onBack.bind(this)}
                onForward={this.onForward.bind(this)}
              />
            ))}
          </SwipeableViews>
        </View>
      </ScreenBackground>
    )
  }
}

const mapStateToProps = state => {
  return {
    modes: [
      { label: 'Auto', mode: 'auto' },
      { label: 'Override', mode: 'override' },
      { label: 'Away', mode: 'away' }
    ]
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModesScreen)
