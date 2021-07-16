const Koa = require('koa')
const config = require('./config')
const router = require("./routes")
const bodyParser = require('koa-bodyparser')
const parameter = require('koa-parameter')
const cors = require('koa2-cors')
// const routerResponse = require('./middleware/routerResponse')

const app = new Koa()

app.use(parameter(app))

// 不这样用会报错
app.use(bodyParser())

// app.use(cors({
//   origin: 'http://192.168.1.27:4000'
// }))
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', ctx.headers.origin)
//   ctx.set('Access-Control-Allow-Headers', 'content-type')
//   ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
//   ctx.set('Access-Control-Allow-Credentials', 'true')
//   await next()
// })
app.use(cors({
  origin: '*'
}))



// app.use(routerResponse())

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