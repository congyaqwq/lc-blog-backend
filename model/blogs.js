const query = require('../mysql')

class UserModels {
  async add(values) {
    let _sql = `INSERT INTO blog SET ?;`
    return await query(_sql, values)
  }
  async list({ page = 1, per_page = 12, ...values }) {
    let _sql = `SELECT * FROM blog ${Object.keys(values).length ? 'WHERE ?' : ''} LIMIT ${(page - 1) * per_page},${(page) * per_page};`
    return await query(_sql, values)
  }
  async update(values) {
    const { id } = values
    let _sql = `UPDATE blog SET ? WHERE id = ${id}`
    return await query(_sql, values)
  }
  async detail(id) {
    let _sql = `SELECT * FROM blog WHERE id = ${id} LIMIT 1`
    return await query(_sql)
  }
}

module.exports = new UserModels()
