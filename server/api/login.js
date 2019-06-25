const {userModel} = require('../dbconnect')
const router = require('koa-router')()
const {createToken} = require('../util/jwt')

async function register (ctx, next) {
  let resData = {
    code: 0,
    message: 'ok'
  }
  let request = ctx.request.body
  var username = request.username
  var password = request.password
  let dbData = await userModel.find({username: username})
  try {
    if (dbData.length) {
      resData.code = 1
      resData.message = '注册失败，用户名已被注册'
    } else {
      var user = new userModel()
      user.username = username
      user.password = password
      user.token = createToken(username)
      let dbDataSave = await user.save()
      resData.code = 0
      resData.message = '注册成功'
      resData.data = dbDataSave
    }
  } catch (e) {
    resData.code = 2
    resData = '注册失败'
  }
  ctx.response.body = resData
}

async function login (ctx, next) {
  let resData = {
    code: 0,
    message: 'ok'
  }
  let request = ctx.request.body
  console.log(11, request)
  var username = request.username
  var password = request.password
  await userModel.findOne({username: username}, function (err, data) {
    if (err) {
      throw err
    } else {
      if (data) {
        console.log(22, data, password)
        if (data.password === password) {
          data.token = createToken(username)
          data.save()
          resData.code = 0
          resData.message = '登录成功'
          resData.data = {
            username: username,
            token: data.token
          }
          console.log(333,resData)
        } else {
          resData.code = 1
          resData.message = '账户名或密码不正确'
        }
      } else {
        resData.code = 2
        resData.message = '用户未注册'
      }
    }
  })
  ctx.response.body = resData
}

router.post('/api/register', register)
router.post('/api/login', login)

module.exports = (app) => {
  app.use(router.routes(), router.allowedMethods())
}
