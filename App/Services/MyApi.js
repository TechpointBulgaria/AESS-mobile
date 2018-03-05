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

  return {
    login,
    fetchRooms
  }
}

export default { create }
