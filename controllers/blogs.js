const jwt = require("jsonwebtoken")
const { list, add, update } = require('../model/blogs')

exports.blogList = async (ctx) => {
  ctx.body = await list(ctx.query)
}

exports.blogAdd = async (ctx) => {
  const { title, content } = ctx.request.body
  if (!title || !content) {
    ctx.throw(401, '参数错误')
  }
  if (ctx.request.body)
    ctx.body = await add(ctx.request.body)
}

exports.blogUpdate = async (ctx) => {
  ctx.verifyParams({
    name: { type: 'string', required: true },
    age: { type: 'int', required: true },
  })
  if (ctx.request.body)
    ctx.body = await update(ctx.request.body)
}

