import axiosCommon from './axiosCommon'
export default {
  list: async function () {
    console.log('getItem', window.sessionStorage.getItem('token'))
    return await axiosCommon.get('/api/user/list')
  },
  add: async function (data) {
    return await axiosCommon.put('/api/user/add', data)
  },
  get: async function (id) {
    return await axiosCommon.get(`/api/user/get/${id}`)
  },
  updata: async function (id, data) {
    return await axiosCommon.post(`/api/user/updata/${id}`, data)
  },
  del: async function (id) {
    return await axiosCommon.delete(`/api/user/delete/${id}`)
  }
}
