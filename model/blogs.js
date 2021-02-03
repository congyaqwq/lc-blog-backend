const query = require('../mysql')

class BlogModels {
  async total(values) {
    const { keyword = "" } = values
    let _sql =
      !keyword
        ? `SELECT count(*) AS count FROM blog;`
        : `SELECT count(*) AS count FROM blog WHERE title LIKE '%${keyword}%' OR content LIKE '%${keyword}%';`
    return await query(_sql)
  }
  async add(values) {
    let _sql = `INSERT INTO blog SET ?;`
    return await query(_sql, values)
  }
  async list({ page = 1, per_page = 12, ...values }) {
    const { keyword = "" } = values
    let _sql =
      !keyword
        ? `SELECT * FROM blog LIMIT ${(page - 1) * per_page},${(page) * per_page};`
        : `SELECT * FROM blog WHERE title LIKE '%${keyword}%' OR content LIKE '%${keyword}%' LIMIT ${(page - 1) * per_page},${(page) * per_page};`
    return await query(_sql)
  }
  async update(values, id) {
    const { title, content } = values
    const val = { title, content }
    let _sql = `UPDATE blog SET ? WHERE id = ${id}`
    return await query(_sql, val)
  }
  async detail(id) {
    let _sql = `SELECT * FROM blog WHERE id = ${id} LIMIT 1`
    return await query(_sql)
  }
  async remove(id) {
    let _sql = `DELETE FROM blog WHERE ?`
    return await query(_sql, { id })
  }
}

module.exports = new BlogModels()
