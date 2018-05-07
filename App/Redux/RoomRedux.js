import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  roomRequest: null,
  roomSuccess: ['payload'],
  roomFailure: null,
  togglePowerSuccess: ['room'],
  toggleModeSuccess: ['room'],
  increaseTemperatureSuccess: ['room'],
  decreaseTemperatureSuccess: ['room']
})

export const RoomTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: null,
  error: null
}

/* ------------- Selectors ------------- */

export const RoomSelectors = {
  getRooms: state => state.rooms.data,
  getRoomFancy: (id, state) => state.rooms.data.filter(r => r.id === id)[0]
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => ({ ...state, fetching: true })

// successful api lookup
export const success = (state, action) => {
  const data = action.payload.result
  return { ...state, fetching: false, error: null, data }
}

// Something went wrong somewhere.
export const failure = state => ({
  ...state,
  fetching: false,
  error: true
})

const toggleProp = prop => (state, { room }) => ({
  ...state,
  data: state.data.map(
    r =>
      r.id === room
        ? {
            ...r,
            commands: r.commands.map(
              c =>
                c.type === 'AC'
                  ? { ...c, state: { ...c.state, [prop]: !c.state[prop] } }
                  : c
            )
          }
        : r
  )
})

export const togglePower = toggleProp('IRONOFF')
export const toggleMode = toggleProp('IRMODE')

const changeTemp = num => (state, { room }) => ({
  ...state,
  data: state.data.map(
    r =>
      r.id === room
        ? {
            ...r,
            commands: r.commands.map(
              c => (c.type === 'ACSET' ? { ...c, state: c.state + num } : c)
            )
          }
        : r
  )
})

const increaseTemp = changeTemp(1)
const decreaseTemp = changeTemp(-1)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ROOM_REQUEST]: request,
  [Types.ROOM_SUCCESS]: success,
  [Types.ROOM_FAILURE]: failure,
  [Types.TOGGLE_POWER_SUCCESS]: togglePower,
  [Types.TOGGLE_MODE_SUCCESS]: toggleMode,
  [Types.INCREASE_TEMPERATURE_SUCCESS]: increaseTemp,
  [Types.DECREASE_TEMPERATURE_SUCCESS]: decreaseTemp
})
