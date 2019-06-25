const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index = require('./server/api/login')
const user = require('./server/api/user')
const history = require('koa2-history-api-fallback')
const {verifyToken} = require('./server/util/jwt')

app.use(history())

app.use(async function (ctx, next) {
  let url = ctx.request.url.split('?')[0]
  let whiteUrl = [/.*\/$/, /.*\/login$/, /.*\/register$/, /.*\/logout$/, /.*\.js$/, /.*\.css$/, /.*\.html$/, /.*\.gif$/, /.*\.jpg$/, /.*\.jpeg$/, /.*\.png$/, /.*\.bmp$/, /.*\.ico$/, /.*\.woff$/, /.*\.ttf$/, /.*\.json$/, /.*\.svg$/, /.*\.map$/]
  let isWhite = false
  for (let i = 0, len = whiteUrl.length; i < len; i++) {
    if (whiteUrl[i].test(url)) {
      isWhite = true
      break
    }
  }
  if (isWhite) {
    await next()
  } else {
    console.log(1111111, url)
    let token = ctx.header.token
    let tokenVerify = await verifyToken(ctx, token)
    console.log('tokenVerify.message', tokenVerify.message)

    if (tokenVerify.message) {
      ctx.response.body = tokenVerify
    } else {
      console.log('ssssssssssssss')
      await next()
    }
  }
})


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/dist'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
index(app)
user(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

app.listen('9999', function () {
  console.log('app listening 9999')
})

module.exports = app
