const Koa = require('koa')
const config = require('./config')
const router = require("./routes")
const bodyParser = require('koa-bodyparser')
const parameter = require('koa-parameter')
// const cors = require('koa2-cors')
const session = require("koa-session");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const secret = fs.readFileSync(process.cwd() + "/secret/private.pem");
// const routerResponse = require('./middleware/routerResponse')

const app = new Koa();

app.use(parameter(app));
app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.headers.origin);
  ctx.set("Access-Control-Allow-Headers", "content-type");
  ctx.set(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH"
  );
  ctx.set("Access-Control-Allow-Credentials", "true");
  await next();
});
// app.use(cors({
//   origin: config.origin
// }))

app.keys = ["my own blog", "i like it"];
let cache = {};
const CONFIG = {
  key: "uuid" /** (string) cookie key (default is koa.sess) */,
  maxAge: 86400000 * 30,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: false /** (boolean) httpOnly or not (default true) */,
  signed: false /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  secure: false /** (boolean) secure cookie*/,
  store: {
    set: (key, sess) => {
      cache[key] = sess;
    },
    get: (key) => cache[key] || {},
    destroy: (key) => delete cache[key],
  },
};

app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
  if (ctx.cookies.get("uuid")) return await next();
  ctx.session.uuid = uuidv4();
  await next();
});

router(app);

// app.use(routerResponse())

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    console.log(err.message);
    ctx.body = {
      message: err.message,
    };
  }
});

app.listen(config.port)

console.log(`listening on port ${config.port}`)