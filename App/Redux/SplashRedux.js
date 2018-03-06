import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  splashRequest: null,
  loggedIn: null,
  notLoggedIn: null
})

export const SplashTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loggedIn: false,
  fetching: true
})

/* ------------- Selectors ------------- */

export const SplashSelectors = {
  isFetching: state => state.splash.fetching,
  isLoggedIn: state => state.splash.loggedIn
}

/* ------------- Reducers ------------- */

export const request = state => state.merge({ fetching: true })

export const loggedIn = state =>
  state.merge({ fetching: false, loggedIn: true })

export const notLoggedIn = state =>
  state.merge({ fetching: false, loggedIn: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SPLASH_REQUEST]: request,
  [Types.LOGGED_IN]: loggedIn,
  [Types.NOT_LOGGED_IN]: notLoggedIn
})
