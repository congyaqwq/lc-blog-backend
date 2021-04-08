const query = require('../mysql')

class BlogModels {
  async thumb({ blog_id, user_id = "" }) {
    // 检查是否已经点赞过
    let _checkSql = `SELECT user_id FROM thumb WHERE user_id = '${user_id}' AND blog_id = '${blog_id}';`
    const res = await query(_checkSql, { blog_id, user_id })
    if (res && res.length) return { error: '已经点赞过' }
    let _sql = `INSERT INTO thumb SET ?;`
    return await query(_sql, { blog_id, user_id })
  }
  async cancelThumb({ blog_id, user_id }) {
    let _sql = `DELETE FROM thumb WHERE blog_id = ${blog_id} AND user_id = '${user_id}';`
    return await query(_sql)
  }
  async thumbList(user_id) {
    let _sql = `SELECT blog_id FROM thumb WHERE user_id = '${user_id}'`
    return await query(_sql)
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
