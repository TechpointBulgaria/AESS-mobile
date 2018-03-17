import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import HistoryActions, { HistorySelectors } from '../Redux/HistoryRedux'
import { LoginSelectors } from '../Redux/LoginRedux'

export function* fetchDeviceHistory(api) {
  const token = yield select(LoginSelectors.getToken)
  const id = yield select(HistorySelectors.getSelectedDevice)
  const history = yield call(api.fetchDeviceHistory, token, id)

  yield call(delay, 1000)
  yield put(HistoryActions.historySuccess(id, history))
}

// export function* login(api, action) {
//   yield put(LoginActions.clearError())
//   const { data } = action
//   const response = yield call(api.login, data)

//   if (response.ok) {
//     const { token } = response.data.result
//     const roomsResponse = yield call(api.fetchRooms, token)
//     if (roomsResponse.ok) {
//       yield put(RoomActions.roomSuccess(roomsResponse.data))
//     } else {
//       yield put(RoomActions.roomFailure())
//     }
//     yield put(LoginActions.loginSuccess(response.data))
//   } else {
//     yield put(LoginActions.loginFailure())
//   }
// }
