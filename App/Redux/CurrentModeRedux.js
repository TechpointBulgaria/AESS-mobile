import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setCurrentModeRequest: ['mode'],
  currentModeRequest: null,
  currentModeSuccess: ['data'],
  currentModeFailure: null
})

export const CurrentModeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CurrentModeSelectors = {
  getCurrentMode: state => state.currentMode.data,
  isFetching: state => state.currentMode.fetching
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, error: null, data })
}

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CURRENT_MODE_REQUEST]: request,
  [Types.SET_CURRENT_MODE_REQUEST]: request,
  [Types.CURRENT_MODE_SUCCESS]: success,
  [Types.CURRENT_MODE_FAILURE]: failure
})
