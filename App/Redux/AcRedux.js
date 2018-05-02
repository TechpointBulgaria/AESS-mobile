import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  toggleOnOff: ['room'],
  toggleMode: ['room'],
  increaseTemperature: ['room'],
  decreaseTemperature: ['room']
})

export const AcTypes = Types
export default Creators
