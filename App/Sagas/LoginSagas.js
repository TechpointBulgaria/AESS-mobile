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

import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import RoomActions from '../Redux/RoomRedux'
import transformRoomData from '../Transforms/TransformRoomData'

export function* login(api, action) {
  yield put(LoginActions.clearError())
  const { data } = action
  const response = yield call(api.login, data)

  if (response.ok) {
    const { token } = response.data.result
    const roomsResponse = yield call(api.fetchRooms, token)
    if (roomsResponse.ok) {
      yield put(RoomActions.roomSuccess(transformRoomData(roomsResponse.data)))
    } else {
      yield put(RoomActions.roomFailure())
    }
    yield put(LoginActions.loginSuccess(response.data))
  } else {
    yield put(LoginActions.loginFailure())
  }
}
