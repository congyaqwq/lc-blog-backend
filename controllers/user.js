const jwt = require("jsonwebtoken")
const fs = require('fs')
const privateKey = fs.readFileSync(process.cwd() + '/secret/private.pem')
const publicKey = fs.readFileSync(process.cwd() + '/secret/public.pem')
const { login, userInfo } = require('../model/user')

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
  const { id } = res[0]
  const token = jwt.sign({ ...values, id }, privateKey, { expiresIn: "1d" })
  ctx.body = token
}

exports.userDetail = async (ctx) => {
  let { authorization: token } = ctx.request.header
  token = token.split('Bearer')[1].trim()
  const values = jwt.verify(token, privateKey)
  const { id } = values
  const res = await userInfo({ id })
  ctx.body = res[0]

}