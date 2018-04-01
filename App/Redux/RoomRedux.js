import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  roomRequest: ['data'],
  roomSuccess: ['payload'],
  roomFailure: null
})

export const RoomTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const RoomSelectors = {
  getRooms: state => state.rooms.data,
  getRoomFancy: (id, state) => state.rooms.data.filter(r => r.id === id)[0]
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const data = action.payload.result
  return state.merge({ fetching: false, error: null, data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ROOM_REQUEST]: request,
  [Types.ROOM_SUCCESS]: success,
  [Types.ROOM_FAILURE]: failure
})
