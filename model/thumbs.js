const query = require('../mysql')

class BlogModels {
  async thumb(values) {
    let _sql = `INSERT INTO thumb SET ?;`

    return await query(_sql, values)
  }
  async thumbList(ip) {
    let _sql = `SELECT blog_id FROM thumb WHERE user_ip = '${ip}'`
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
