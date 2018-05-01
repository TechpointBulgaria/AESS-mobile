import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/MyApi'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

// import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RoomTypes } from '../Redux/RoomRedux'
import { SplashTypes } from '../Redux/SplashRedux'
import { HistoryTypes } from '../Redux/HistoryRedux'
import { CurrentModeTypes } from '../Redux/CurrentModeRedux'

/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'
import { login } from './LoginSagas'
import { getRooms } from './RoomSagas'
import { init } from './SplashSagas'
import { fetchDeviceHistory } from './HistorySagas'
import { getCurrentMode, setCurrentMode } from './ModesSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),
    //
    // // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(RoomTypes.ROOM_REQUEST, getRooms, api),
    takeLatest(SplashTypes.SPLASH_REQUEST, init, api),
    takeLatest(HistoryTypes.HISTORY_REQUEST, fetchDeviceHistory, api),
    takeLatest(CurrentModeTypes.CURRENT_MODE_REQUEST, getCurrentMode, api),
    takeLatest(CurrentModeTypes.SET_CURRENT_MODE_REQUEST, setCurrentMode, api)
  ])
}
