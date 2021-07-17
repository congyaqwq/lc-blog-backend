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
  async cancelThumb({ blog_id='', user_id='' }) {
    return await knex('thumb').where({ blog_id, user_id }).del()
  }
  async thumbList(user_id = '') {
    return await knex('thumb').select('blog_id').where('user_id', user_id)
  }
  async addThumb(id) {
    return knex('blog').where({ id }).increment('thumbs', 1)
  }
  async subThumb(id) {
    return knex('blog').where({ id }).decrement('thumbs', 1)
  }
}

module.exports = new BlogModels()
