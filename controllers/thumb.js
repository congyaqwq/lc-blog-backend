const { thumb, addThumb, cancelThumb, subThumb } = require('../model/thumbs')

exports.thumbBlog = async (ctx) => {
  const user_id = ctx.cookies.get('uid')
  const res = await thumb({ ...ctx.request.body, user_id })
  const { blog_id } = ctx.request.body
  await addThumb(blog_id)
  ctx.body = res
}

exports.cancelThumb = async (ctx) => {
  const user_id = ctx.cookies.get('uid')
  const res = await cancelThumb({ ...ctx.request.body, user_id })
  const { blog_id } = ctx.request.body
  await subThumb(blog_id)
  ctx.body = res
}


