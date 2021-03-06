import React, { Component } from 'react'
import { connect } from 'react-redux'
import Graph from '../Components/devices/Graph'
import HistoryActions, { HistorySelectors } from '../Redux/HistoryRedux'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { Colors, Metrics } from '../Themes'

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.app.transparent,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth
  },
  text: {
    color: Colors.app.white,
    fontSize: 18
  },
  graphLabel: {
    color: Colors.app.white,
    paddingLeft: 5,
    paddingTop: 5,
    alignSelf: 'stretch'
  }
})

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

  loadingView = <ActivityIndicator size="large" color={Colors.app.white} />
  errorView = <Text style={styles.text}>Could not get data from server</Text>

  render() {
    const { selectedDeviceName, device } = this.props
    const Comp = device
      ? (() => {
          const { error, fetching, payload } = device
          if (fetching) return this.loadingView
          if (error) return this.errorView
          if (payload) return <Graph sensor={payload} />
        })()
      : null

    return (
      <View style={styles.view}>
        {(!device || !device.fetching) && (
          <Text style={styles.graphLabel}>{selectedDeviceName}</Text>
        )}
        {Comp}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  selectedDeviceId: HistorySelectors.getSelectedDeviceId(state),
  selectedDeviceName: HistorySelectors.getSelectedDeviceName(state),
  device: HistorySelectors.getHistory(
    HistorySelectors.getSelectedDeviceId(state),
    state
  )
})

const mapDispatchToProps = dispatch => ({
  fetchDeviceHistory: id => dispatch(HistoryActions.historyRequest(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphContainer)
