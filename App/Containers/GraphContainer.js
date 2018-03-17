import React, { Component } from 'react'
import { connect } from 'react-redux'
import Graph from '../Components/devices/Graph'
import HistoryActions, { HistorySelectors } from '../Redux/HistoryRedux'
import { Text, View, StyleSheet } from 'react-native'
import { Colors, Metrics } from '../Themes'
import Widget from '../Components/devices/Widget'

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.app.transparent,
    height: Metrics.screenWidth / 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth
  },
  text: {
    color: Colors.app.white,
    fontSize: 18
  }
})

const GraphLoading = () => (
  <Widget flex={3}>
    <View style={styles.view}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  </Widget>
)
const GraphError = () => (
  <Widget flex={3}>
    <View style={styles.view}>
      <Text style={styles.text}>Error</Text>
    </View>
  </Widget>
)

class GraphContainer extends Component {
  componentWillMount() {
    if (!this.props.device) {
      this.props.fetchDeviceHistory(this.props.selectedDeviceId)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.device) {
      this.props.fetchDeviceHistory(nextProps.selectedDeviceId)
    }
  }

  render() {
    const { device, selectedDeviceId } = this.props

    if (!device) {
      console.log('still dont have device?')
      return null
    }

    const { error, fetching, payload } = device

    if (fetching) return <GraphLoading />
    if (error) return <GraphError />
    if (payload) return <Graph sensor={payload} />
  }
}

const mapStateToProps = state => ({
  selectedDeviceId: HistorySelectors.getSelectedDevice(state),
  device: HistorySelectors.getHistory(
    HistorySelectors.getSelectedDevice(state),
    state
  )
})

const mapDispatchToProps = dispatch => ({
  fetchDeviceHistory: id => dispatch(HistoryActions.historyRequest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer)
