import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import HistoryActions, { HistorySelectors } from '../Redux/HistoryRedux'
import { LoginSelectors } from '../Redux/LoginRedux'
import transformSensorData from '../Transforms/TransformSensorData'

export function* fetchDeviceHistory(api) {
  const token = yield select(LoginSelectors.getToken)
  const id = yield select(HistorySelectors.getSelectedDeviceId)

  if (id === 99) {
    yield put(
      HistoryActions.historySuccess(id, [
        { x: '15:00', y: 20 },
        { x: '15:30', y: 21 },
        { x: '16:00', y: 21 },
        { x: '16:30', y: 23 },
        { x: '17:00', y: 23.5 },
        { x: '17:30', y: 22 },
        { x: '18:00', y: 21 },
        { x: '18:30', y: 20 },
        { x: '19:00', y: 20.3 },
        { x: '19:30', y: 20.8 },
        { x: '20:00', y: 22 }
      ])
    )
    return
  }

  const response = yield call(api.fetchDeviceHistory, token, id)
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(
      HistoryActions.historySuccess(
        id,
        transformSensorData(response.data.result)
      )
    )
  } else {
    yield put(HistoryActions.historyFailure())
  }
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
