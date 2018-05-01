import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import Immutable from 'seamless-immutable'

import {
  reducer as loginReducer,
  INITIAL_STATE as loginState
} from './LoginRedux'
import { reducer as roomReducer, INITIAL_STATE as roomState } from './RoomRedux'
import {
  reducer as splashReducer,
  INITIAL_STATE as splashState
} from './SplashRedux'
import {
  reducer as historyReducer,
  INITIAL_STATE as historyState
} from './HistoryRedux'
import {
  reducer as currentModeReducer,
  INITIAL_STATE as currentModeState
} from './CurrentModeRedux'

/* ------------- Assemble The Reducers ------------- */
export const appReducers = combineReducers({
  login: loginReducer,
  rooms: roomReducer,
  splash: splashReducer,
  history: historyReducer,
  currentMode: currentModeReducer
})

const initialState = {
  login: loginState,
  rooms: roomState,
  splash: splashState,
  history: historyState,
  currentMode: currentModeState
}

//handle logout -> clear all the state
const rootReducer = (state, action) =>
  action.type === 'LOGOUT' ? initialState : appReducers(state, action)

export default () => {
  let finalReducers = rootReducer
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, rootReducer)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
