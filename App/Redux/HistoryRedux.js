import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  historyRequest: ['id'],
  historySuccess: ['id', 'payload'],
  historyFailure: ['id'],
  historySelectDevice: ['id']
})

export const HistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const DEVICE_INITIAL_STATE = Immutable({
  fetching: true,
  payload: null,
  error: null
})

export const INITIAL_STATE = Immutable({
  selectedDevice: null,
  devices: Immutable({})
})

/* ------------- Selectors ------------- */

export const HistorySelectors = {
  getHistory: (id, state) => state.history.devices[id],
  getSelectedDevice: state => state.history.selectedDevice
}

const updateDeviceAtId = (state, id, device) =>
  state.merge({
    devices: state.devices.merge({
      [id]: device
    })
  })

/* ------------- Reducers ------------- */

// request the data from an api

export const request = (state, { id }) =>
  updateDeviceAtId(state, id, { fetching: true, payload: null, error: null })

// successful api lookup
export const success = (state, { id, payload }) =>
  updateDeviceAtId(state, id, { fetching: false, payload, error: null })

// Something went wrong somewhere.
export const failure = state =>
  updateDeviceAtId(state, id, { fetching: false, payload: null, error: true })

export const select = (state, { id }) => state.merge({ selectedDevice: id })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HISTORY_REQUEST]: request,
  [Types.HISTORY_SUCCESS]: success,
  [Types.HISTORY_FAILURE]: failure,
  [Types.HISTORY_SELECT_DEVICE]: select
})
