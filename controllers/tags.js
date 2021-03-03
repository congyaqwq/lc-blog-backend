const { total, list, add, update, detail, remove } = require('../model/tags')

exports.tagsList = async (ctx) => {
  const countObj = await total(ctx.query)
  const tagsList = await list(ctx.query)
  ctx.body = {
    total: countObj[0].count,
    list: tagsList
  }
}

exports.tagsAdd = async (ctx) => {
  const { name } = ctx.request.body
  if (!name) {
    ctx.throw(401, '参数错误')
  }
  if (ctx.request.body)
    ctx.body = await add(ctx.request.body)
}

exports.tagsUpdate = async (ctx) => {
  const { id } = ctx.params
  if (ctx.request.body)
    ctx.body = await update(ctx.request.body, id)
}

exports.tagsDetail = async (ctx) => {
  let { id } = ctx.params
  id = Number(id)
  const { user_id } = ctx.query
  const data = await detail(id, user_id)
  if (!data) {
    ctx.throw('404', '未找到该条数据')
  }
  ctx.body = data
}

exports.tagsRemove = async (ctx) => {
  const { id } = ctx.params
  const data = await remove(id)
  ctx.body = data
}

