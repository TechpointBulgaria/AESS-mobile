import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  clearError: null,
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  token: null
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getToken: state => state.login.token,
  isLoggedIn: state => !!state.login.token,
  isFetching: state => state.login.fetching,
  getError: state => state.login.error,
  username: state => state.login.data.email
}

/* ------------- Reducers ------------- */

export const clearError = state => state.merge({ error: null })

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({
    fetching: false,
    error: null,
    payload,
    token: payload.result.token
  })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.CLEAR_ERROR]: clearError
})
