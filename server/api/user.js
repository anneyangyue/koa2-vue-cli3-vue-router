const {userListModel} = require('../dbconnect')
const router = require('koa-router')()
const {verifyToken} = require('../util/jwt')

async function list (ctx, next) {

  let token = ctx.header.token
  await verifyToken(ctx, token)
  let tokenVerify = await verifyToken(ctx, token)
  console.log('tokenVerify.message', tokenVerify.message)

  if (tokenVerify.message) {
    ctx.response.body = tokenVerify
    return
  }
  let resData = {
    code: 0,
    message: 'ok'
  }
  try {
    let dbData = await userListModel.find({})
    resData.code = 0
    resData.message = '获取用户列表成功'
    resData.data = dbData
  } catch (e) {
    console.log(e)
    resData.code = 1
    resData.message = '获取用户列表失败'
    resData.data = []
  }
  console.log('sssssssssssss', resData)

  ctx.response.body = resData
}

async function add (ctx, next) {
  let resData = {
    code: 0,
    message: 'ok'
  }
  try {
    let request = ctx.request.body
    let newUser = new userListModel()
    newUser.name = request.name
    newUser.age = request.age
    newUser.address = request.address
    let dbData = await newUser.save()
    resData.code = 0
    resData.message = '新增用户成功'
    resData.data = dbData
  } catch (e) {
    console.log(e)
    resData.code = 0
    resData.message = '新增用户失败'
  }
  ctx.response.body = resData
}

async function updata (ctx, next) {
  let resData = {
    code: 0,
    message: 'ok'
  }
  try {
    let _id = ctx.params.id
    let request = ctx.request.body
    let dbData = await userListModel.findOne({_id: _id})
    for (var key in request) {
      dbData[key] = request[key]
    }
    dbData.save(function (err) {
      if (err) {
        resData.code = 1
        resData.message = '更新用户信息失败'
      } else {
        resData.code = 0
        resData.message = '更新用户信息成功'
      }
    })
  } catch (e) {
    console.log(e)
    resData.code = 2
    resData.message = '更新用户信息失败'
  }
  ctx.response.body = resData
}

async function del (ctx, next) {
  let resData = {
    code: 0,
    message: 'ok'
  }
  try {
    let _id = ctx.params.id
    let dbData = await userListModel.findOne({_id: _id})
    dbData.remove(function (err) {
      if (err) {
        resData.code = 1
        resData.message = '删除用户失败'
      } else {
        resData.code = 0
        resData.message = '删除用户成功'
      }
    })
  } catch (e) {
    resData.code = 2
    resData.message = '删除用户失败'
  }
  ctx.response.body = resData
}

async function get (ctx, next) {
  let resData = {
    code: 0,
    message: 'ok'
  }
  try {
    let _id = ctx.params.id
    let dbData = await userListModel.findOne({_id: _id})
    resData.code = 0
    resData.message = '获取用户成功'
    resData.data = dbData
  } catch (e) {
    console.log(e)
    resData.code = 1
    resData.message = '获取用户失败'
  }
  ctx.response.body = resData
}

router.get('/api/user/list', list)
router.put('/api/user/add', add)
router.get('/api/user/get/:id', get)
router.post('/api/user/updata/:id', updata)
router.delete('/api/user/delete/:id', del)

module.exports = (app) => {
  app.use(router.routes(), router.allowedMethods())
}
