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

import { select, call, put } from 'redux-saga/effects'
import CurrentModeActions from '../Redux/CurrentModeRedux'
import { LoginSelectors } from '../Redux/LoginRedux'

export function* getCurrentMode(api, action) {
  const token = yield select(LoginSelectors.getToken)
  const response = yield call(api.fetchCurrentMode, token)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CurrentModeActions.currentModeSuccess(response.data.result.mode))
  } else {
    yield put(CurrentModeActions.currentModeFailure())
  }
}

export function* setCurrentMode(api, { mode }) {
  const token = yield select(LoginSelectors.getToken)
  const response = yield call(api.setCurrentMode, token, mode)
  if (response.ok) {
    yield put(CurrentModeActions.currentModeSuccess(mode))
  } else {
    console.log(response)
    yield put(CurrentModeActions.currentModeFailure())
  }
}
