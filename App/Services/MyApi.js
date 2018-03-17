import apisauce from 'apisauce'

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

  const fetchRooms = token =>
    api.get(
      'rooms',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

  //TODO mock data
  const fetchDeviceHistory = (token, id) => {
    if (id === 1)
      return [
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
      ]
    return [
      { x: '16:00', y: 21 },
      { x: '16:30', y: 23 },
      { x: '17:00', y: 23.5 },
      { x: '17:30', y: 22 }
    ]
  }

  return {
    login,
    fetchRooms,
    fetchDeviceHistory
  }
}

export default { create }
