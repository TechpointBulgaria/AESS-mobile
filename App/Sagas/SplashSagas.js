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

import { delay } from 'redux-saga'
import { all, call, put, select } from 'redux-saga/effects'
import SplashActions from '../Redux/SplashRedux'
import { AsyncStorage } from 'react-native'
import RoomActions from '../Redux/RoomRedux'
import { LoginSelectors } from '../Redux/LoginRedux'

function* waitRandomTime() {
  yield call(delay, 800 + Math.random() * 800)
}

export function* init(api, action) {
  let rehydrated = yield select(
    state => state._persist && state._persist.rehydrated
  )
  while (!rehydrated) {
    yield call(delay, 100)
    rehydrated = yield select(
      state => state._persist && state._persist.rehydrated
    )
  }

  const token = yield select(LoginSelectors.getToken)

  if (token) {
    const [roomsResponse] = yield all([
      call(api.fetchRooms, token),
      call(waitRandomTime)
    ])
    if (roomsResponse.ok) {
      yield put(RoomActions.roomSuccess(roomsResponse.data))
    } else {
      yield put(RoomActions.roomFailure())
    }
    yield put(SplashActions.loggedIn())
  } else {
    yield call(waitRandomTime)
    yield put(SplashActions.notLoggedIn())
  }
}
