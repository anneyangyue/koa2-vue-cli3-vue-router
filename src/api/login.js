import axiosCommon from './axiosCommon'
export default {
  register: async function (data) {
    return await axiosCommon.post('/api/register', data)
  },
  login: async function (data) {
    return await axiosCommon.post('/api/login', data)
  }
}
