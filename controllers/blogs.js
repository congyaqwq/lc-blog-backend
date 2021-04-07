const { total, list, orderList, add, update, detail, remove, addViews } = require('../model/blogs')

exports.blogList = async (ctx) => {
  let blogList = []
  const user_id = ctx.cookies.get('uid')
  if (ctx.request.url.includes('frontlist')) {
    blogList = await orderList(ctx.query)
  } else {
    blogList = await list(ctx.query)
  }
  const countObj = await total({ ...ctx.query, user_id })
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
  let { authorization: token } = ctx.request.header
  let { id } = ctx.params
  id = Number(id)
  const user_id = ctx.cookies.get('uid')
  console.log(user_id, 1)
  if (!token) {
    await addViews(id)
  }
  const data = await detail(id, user_id)
  if (!data) {
    ctx.throw('404', '未找到该条数据')
  }
  ctx.body = data
}

exports.blogRemove = async (ctx) => {
  const { id } = ctx.params
  const data = await remove(id)
  ctx.body = data
}

