const Koa = require('koa')
const config = require('./config')
const router = require("./routes")
const bodyParser = require('koa-bodyparser')
const parameter = require('koa-parameter')

const app = new Koa()

app.use(parameter(app))

// 不这样用会报错
app.use(bodyParser())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500
    ctx.body = {
      message: err.message
    }
  }
})

router(app)
app.listen(config.port)

console.log(`listening on port ${config.port}`)