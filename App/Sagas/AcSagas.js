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

function* makeCall(method, api, action) {
  const { room } = action
  const token = yield select(LoginSelectors.getToken)
  console.log(`calling api for: ${room} - ${method}`)
  const response = yield call(api[method], token, room)
  if (response.ok) {
    console.log(response.data)
  } else {
    console.log('fak: ', response)
  }
}

export function* toggleOnOff(api, action) {
  yield call(makeCall, 'acToggleOnOff', api, action)
}
export function* toggleMode(api, action) {
  yield call(makeCall, 'acToggleMode', api, action)
}
export function* increaseTemperature(api, action) {
  yield call(makeCall, 'acIncreaseTemperature', api, action)
}
export function* decreaseTemperature(api, action) {
  yield call(makeCall, 'acDecreaseTemperature', api, action)
}
