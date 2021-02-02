const { total, list, add, update, detail, remove } = require('../model/blogs')

exports.blogList = async (ctx) => {
  const countObj = await total()
  const blogList = await list(ctx.query)
  ctx.body = {
    total: countObj[0].count,
    list: blogList
  }
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
  const { id } = ctx.params
  if (ctx.request.body)
    ctx.body = await update(ctx.request.body, id)
}

exports.blogDetail = async (ctx) => {
  const { id } = ctx.params
  const data = await detail(id)
  ctx.body = data[0]
}

exports.blogRemove = async (ctx) => {
  const { id } = ctx.params
  const data = await remove(id)
  ctx.body = data
}

