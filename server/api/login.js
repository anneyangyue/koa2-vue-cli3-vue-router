const {userModel, checkCodeModel} = require('../dbconnect')
const router = require('koa-router')()
const {createToken} = require('../util/jwt')
const svgCaptcha = require('svg-captcha')

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
  var codeInfo = request.checkCode
  let userInfo = await userModel.findOne({username: username})
  let dbCode = await checkCodeModel.findOne({code: codeInfo})
  if (userInfo) {
    if (userInfo.password === password && dbCode) {
      userInfo.token = createToken(username)
      userInfo.save()
      resData.code = 0
      resData.message = '登录成功'
      resData.data = {
        username: username,
        token: userInfo.token
      }
    } else if (!dbCode) {
      resData.code = 3
      resData.message = '验证码不正确'
    } else {
      resData.code = 1
      resData.message = '账户名或密码不正确'
    }
  } else {
    resData.code = 2
    resData.message = '用户未注册'
  }
  ctx.response.body = resData
}

async function checkCode (ctx, next) {
  // ctx.response.body = 'test'
  console.log('ssssse')
  let captcha = svgCaptcha.create({ 
    inverse: false, // 翻转颜色
    fontSize: 36, // 字体大小
    noise: 2, // 噪声线条数
    width: 80, // 宽度
    height: 30 // 高度
  })
  ctx.request.session = captcha.text.toLowerCase() // 保存到session,忽略大小写 
  console.log(ctx.request.session) // 0xtg 生成的验证码
  // ctx.cookies.set('captcha', ctx.request.session, {httpOnly: true}) //保存到cookie 方便前端调用验证
  try {
    let dbCode = await checkCodeModel.find({})
    if (dbCode.length) {
      dbCode[0].code = ctx.request.session
      await dbCode[0].save()
    } else {
      let newCode = new checkCodeModel()
      newCode.code = ctx.request.session
      await newCode.save()
    }
  } catch (e) {
    console.log(e)
  }
  ctx.response.body = String(captcha.data)
}

router.post('/api/register', register)
router.post('/api/login', login)
router.get('/api/checkCode', checkCode)

module.exports = (app) => {
  app.use(router.routes(), router.allowedMethods())
}
