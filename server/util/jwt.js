const jwt = require('jsonwebtoken')
const {jwtSecretKey, jwtExpiresIn} = require('./config')
const {userModel} = require('../dbconnect')

module.exports = {
  createToken: function (username) {
    let token = jwt.sign({username: username}, jwtSecretKey, {expiresIn: jwtExpiresIn})
    return token
  },
  verifyToken: async function (ctx, token) {
    console.log('verifyToken', token, jwtSecretKey, ctx.request.url)
    try {
      // if (ctx.url !== '/api/login' && ctx.url !== '/api/register') {
        let {username = ''} = await jwt.verify(token, jwtSecretKey)
        console.log('username', username)
        let res = await userModel.find({username, token})
        console.log('res', res)
        if (res.length === 0) {
          if (token) {
            return {code: 401, message: '登录已过期，请重新登录!'}
          } else {
            return {code: 401, message: '你还没有登录，请先去登录!'}
          }
        } else {
          return true
        }
      // }
    } catch (e) {
      return {code: 401, message: 'token验证错误，请重新登录'}
    }
  }
}
