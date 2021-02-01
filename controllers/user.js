const jwt = require("jsonwebtoken")
const fs = require('fs')
const privateKey = fs.readFileSync(process.cwd() + '/secret/private.pem')
const { login } = require('../model/user')

exports.userLogin = async (ctx) => {
  const { body = {} } = ctx.request
  const { username, password } = body
  if (!username || !password) {
    ctx.throw('用户名或密码不能为空')
  }
  const values = { username, password }
  const res = await login(values)
  if (!res || !res.length) {
    ctx.throw('未找到该用户')
  }
  const token = jwt.sign(values, privateKey, { expiresIn: "1d" })
  ctx.body = token
}