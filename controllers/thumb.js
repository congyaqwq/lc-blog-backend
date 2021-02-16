const { thumb, addThumb } = require('../model/thumbs')
const { getIp } = require('../middleware/ip')

exports.thumbBlog = async (ctx) => {
  const user_ip = getIp(ctx.request)
  const res = await thumb({ ...ctx.request.body, user_ip })
  const { blog_id } = ctx.request.body
  await addThumb(blog_id)
  ctx.body = res
}


