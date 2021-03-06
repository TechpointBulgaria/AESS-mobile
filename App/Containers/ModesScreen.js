import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views-native'
import { Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { Colors, Fonts, Metrics } from '../Themes'
import ScreenBackground from '../Components/ScreenBackground'
import LinearGradient from 'react-native-linear-gradient'
import CurrentModeActions, {
  CurrentModeSelectors
} from '../Redux/CurrentModeRedux'

// import styles from './Styles/ModesScreenStyle'

const modes = [
  {
    name: 'Auto',
    mode: 'auto',
    description: 'Autonomous mode with optimizing algorithms switched on.'
  },
  {
    name: 'Away',
    mode: 'away',
    description: 'Autonomous mode optimized for lower consumption.'
  },
  {
    name: 'Override',
    mode: 'override',
    description: 'Only shows sensor data. Does not controll anything.'
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
    width: Metrics.screenWidth / 2
  },
  buttonText: {
    color: Colors.app.white,
    fontWeight: 'bold'
  },
  activeText: {
    backgroundColor: Colors.transparent,
    fontSize: 16,
    color: Colors.app.success, //'#0EAD69',
    fontWeight: 'bold',

    borderColor: Colors.app.success,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    width: Metrics.screenWidth / 2,
    textAlign: 'center'
  }
})

const ModeView = ({
  mode,
  onBack,
  onForward,
  active,
  onActivate,
  isFetching
}) => (
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
      <View style={modeStyles.section} />
      <View style={modeStyles.section}>
        <Text style={modeStyles.title}>{mode.name}</Text>
      </View>
      <View style={modeStyles.section}>
        <Text style={[modeStyles.info, modeStyles.padded]}>
          {mode.description}
        </Text>
      </View>
      <View style={modeStyles.section}>
        {active ? (
          <Text style={modeStyles.activeText}>Active</Text>
        ) : (
          <Button
            loading={isFetching}
            onPress={onActivate}
            title="Activate"
            buttonStyle={modeStyles.buttonInner}
            textStyle={modeStyles.buttonText}
          />
        )}
      </View>
      <View style={modeStyles.section} />
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

class ModesScreen extends Component {
  state = {
    index: 0
  }
  componentDidMount() {
    this.props.getCurrentMode()
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
    const { currentMode, isFetching } = this.props
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
                isFetching={isFetching}
                active={m.mode === currentMode}
                onActivate={() => this.props.setCurrentMode(m.mode)}
                onBack={this.onBack.bind(this)}
                onForward={this.onForward.bind(this)}
              />
            ))}
          </SwipeableViews>
          <Dots index={this.state.index} n={modes.length} />
        </View>
      </ScreenBackground>
    )
  }
}

const dotStyle = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: Colors.app.white,
    borderWidth: 1,
    marginRight: 3
  },
  active: {
    backgroundColor: Colors.app.white
  },
  inactive: {
    backgroundColor: Colors.transparent
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  }
})

const Dot = ({ active }) => (
  <View style={[dotStyle.dot, active ? dotStyle.active : dotStyle.inactive]} />
)

const Dots = ({ n, index }) => (
  <View style={dotStyle.container}>
    {Array(n)
      .fill()
      .map((_, i) => <Dot key={i} active={i === index} />)}
  </View>
)

const mapStateToProps = state => ({
  currentMode: CurrentModeSelectors.getCurrentMode(state),
  isFetching: CurrentModeSelectors.isFetching(state)
})

const mapDispatchToProps = dispatch => ({
  getCurrentMode: () => dispatch(CurrentModeActions.currentModeRequest()),
  setCurrentMode: mode =>
    dispatch(CurrentModeActions.setCurrentModeRequest(mode))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModesScreen)
