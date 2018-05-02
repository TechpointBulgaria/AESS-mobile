import apisauce from 'apisauce'

const authHeader = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const create = (baseURL = 'http://62.210.30.128:27272/v1') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const login = ({ email, password }) =>
    api.post('auth/login', {
      email,
      password
    })

  const fetchRooms = token => api.get('rooms', {}, authHeader(token))

  const fetchDeviceHistory = (token, id) =>
    api.get(`devices/${id}/history`, {}, authHeader(token))

  const fetchCurrentMode = token => api.get(`modes`, {}, authHeader(token))

  const setCurrentMode = (token, mode) =>
    api.post(`modes`, { mode }, authHeader(token))

  const makeACCommand = (type, value) => (token, room) =>
    api.post(`devices/${room}/${type}`, { value }, authHeader(token))

  const acToggleOnOff = makeACCommand('ac', 'IRONOFF')
  const acToggleMode = makeACCommand('ac', 'IRMODE')
  const acIncreaseTemperature = makeACCommand('acset', 'IRTEMP+')
  const acDecreaseTemperature = makeACCommand('acset', 'IRTEMP-')

  return {
    login,
    fetchRooms,
    fetchDeviceHistory,
    fetchCurrentMode,
    setCurrentMode,
    acToggleOnOff,
    acToggleMode,
    acIncreaseTemperature,
    acDecreaseTemperature
  }
}

export default { create }
