import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  roomRequest: null,
  roomSuccess: ['payload'],
  roomFailure: null,
  togglePowerPending: ['room'],
  togglePowerSuccess: ['room'],
  toggleModePending: ['room'],
  toggleModeSuccess: ['room'],
  increaseTemperaturePending: ['room'],
  increaseTemperatureSuccess: ['room'],
  decreaseTemperaturePending: ['room'],
  decreaseTemperatureSuccess: ['room'],
  turnSwitchPending: ['id'],
  turnSwitchSuccess: ['id', 'value']
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

const toggleProp = (prop, del) => (state, { room }) => ({
  ...state,
  data: state.data.map(
    r =>
      r.id === room
        ? {
            ...r,
            commands: r.commands.map(
              c =>
                c.type === 'AC'
                  ? {
                      ...c,
                      [del]: false,
                      state: { ...c.state, [prop]: !c.state[prop] }
                    }
                  : c
            )
          }
        : r
  )
})

export const togglePower = toggleProp('IRONOFF', 'powerPending')
export const toggleMode = toggleProp('IRMODE', 'modePending')

const seTrueInCommand = (where, prop) => (state, { room }) => {
  console.log(where, prop, state, room)
  return {
    ...state,
    data: state.data.map(
      r =>
        r.id === room
          ? {
              ...r,
              commands: r.commands.map(
                c => (c.type === where ? { ...c, [prop]: true } : c)
              )
            }
          : r
    )
  }
}

export const togglePowerPending = seTrueInCommand('AC', 'powerPending')
export const toggleModePending = seTrueInCommand('AC', 'modePending')
export const increaseTemperaturePending = seTrueInCommand(
  'ACSET',
  'increaseTemperaturePending'
)
export const decreaseTemperaturePending = seTrueInCommand(
  'ACSET',
  'decreaseTemperaturePending'
)

const changeTemp = (num, del) => (state, { room }) => ({
  ...state,
  data: state.data.map(
    r =>
      r.id === room
        ? {
            ...r,
            commands: r.commands.map(
              c =>
                c.type === 'ACSET'
                  ? { ...c, [del]: false, state: c.state + num }
                  : c
            )
          }
        : r
  )
})

const increaseTemp = changeTemp(1, 'increaseTemperaturePending')
const decreaseTemp = changeTemp(-1, 'decreaseTemperaturePending')

const turnSwitchPending = (state, { id }) => ({
  ...state,
  data: state.data.map(r => ({
    ...r,
    commands: r.commands.map(c => ({
      ...c,
      fetching: c.type === 'SWITCH' && c.deviceId === id
    }))
  }))
})

const turnSwitchSuccess = (state, { id, value }) => ({
  ...state,
  data: state.data.map(r => ({
    ...r,
    commands: r.commands.map(
      c =>
        c.type === 'SWITCH' && c.deviceId === id
          ? { ...c, state: value ? 'ON' : 'OFF', fetching: false }
          : c
    )
  }))
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ROOM_REQUEST]: request,
  [Types.ROOM_SUCCESS]: success,
  [Types.ROOM_FAILURE]: failure,
  [Types.TOGGLE_POWER_SUCCESS]: togglePower,
  [Types.TOGGLE_MODE_SUCCESS]: toggleMode,
  [Types.INCREASE_TEMPERATURE_SUCCESS]: increaseTemp,
  [Types.DECREASE_TEMPERATURE_SUCCESS]: decreaseTemp,
  [Types.TURN_SWITCH_PENDING]: turnSwitchPending,
  [Types.TURN_SWITCH_SUCCESS]: turnSwitchSuccess,
  [Types.TOGGLE_POWER_PENDING]: togglePowerPending,
  [Types.TOGGLE_MODE_PENDING]: toggleModePending,
  [Types.INCREASE_TEMPERATURE_PENDING]: increaseTemperaturePending,
  [Types.DECREASE_TEMPERATURE_PENDING]: decreaseTemperaturePending
})
