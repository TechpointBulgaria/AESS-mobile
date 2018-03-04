import apisauce from 'apisauce'

const create = (baseURL = 'http://62.210.30.128:27272') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const login = ({ email, password }) =>
    api.post('v1/auth/login', {
      email,
      password
    })

  return {
    login
  }
}

export default { create }
