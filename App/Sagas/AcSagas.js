/************************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put, select } from 'redux-saga/effects'
import { LoginSelectors } from '../Redux/LoginRedux'
import RoomActions from '../Redux/RoomRedux'

function* makeCall(method, api, action) {
  const { room } = action
  const token = yield select(LoginSelectors.getToken)
  console.log(`calling api for: ${room} - ${method}`)
  const response = yield call(api[method], token, room)
  if (response.ok) {
    console.log(response.data)
    return true
  } else {
    console.log('fak: ', response)
    return false
  }
}

export function* toggleOnOff(api, action) {
  yield put(RoomActions.togglePowerPending(action.room))
  const result = yield call(makeCall, 'acToggleOnOff', api, action)
  if (result) yield put(RoomActions.togglePowerSuccess(action.room))
}
export function* toggleMode(api, action) {
  yield put(RoomActions.toggleModePending(action.room))
  const result = yield call(makeCall, 'acToggleMode', api, action)
  if (result) yield put(RoomActions.toggleModeSuccess(action.room))
}
export function* increaseTemperature(api, action) {
  yield put(RoomActions.increaseTemperaturePending(action.room))
  const result = yield call(makeCall, 'acIncreaseTemperature', api, action)
  if (result) yield put(RoomActions.increaseTemperatureSuccess(action.room))
}
export function* decreaseTemperature(api, action) {
  yield put(RoomActions.decreaseTemperaturePending(action.room))
  const result = yield call(makeCall, 'acDecreaseTemperature', api, action)
  if (result) yield put(RoomActions.decreaseTemperatureSuccess(action.room))
}
