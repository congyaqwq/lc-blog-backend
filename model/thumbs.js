const knex = require('../mysql')

class BlogModels {
  async thumb({ blog_id, user_id = "" }) {
    // 检查是否已经点赞过
    const res = await knex('thumb')
      .select('user_id')
      .where({
        user_id,
        blog_id
      })
    if (res && res.length) return { error: '已经点赞过' }
    return knex('thumb').insert([{
      user_id,
      blog_id
    }])
  }
  async cancelThumb({ blog_id, user_id }) {
    let _sql = `DELETE FROM thumb WHERE blog_id = ${blog_id} AND user_id = '${user_id}';`
    return await query(_sql)
  }
  async thumbList(user_id = '') {
    return await knex('thumb').select('blog_id').where('user_id', user_id)
  }
  async addThumb(id) {
    let _sql = `UPDATE blog SET thumbs = thumbs+1 WHERE id = ${id}`
    return await query(_sql)
  }
  async subThumb(id) {
    let _sql = `UPDATE blog SET thumbs = thumbs-1 WHERE id = ${id}`
    return await query(_sql)
  }
}

module.exports = new BlogModels()
