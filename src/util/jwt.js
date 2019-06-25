module.exports = {
  saveAdminInfo: (data) => {
    console.log(data)
    window.sessionStorage.setItem('token', data.token)
    window.sessionStorage.setItem('username', data.username)
    console.log(window.sessionStorage.getItem('username'))
  },
  adminLogout: (state) => {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('username')
  }
};