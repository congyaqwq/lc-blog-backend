const query = require('../mysql')

class TagModels {
  async total(values) {
    const { keyword = "" } = values
    let _sql =
      !keyword
        ? `SELECT count(*) AS count FROM tags;`
        : `SELECT count(*) AS count FROM tags WHERE name LIKE '%${keyword}%';`
    return await query(_sql)
  }
  async add(values) {
    let _sql = `INSERT INTO tags SET ?;`
    return await query(_sql, values)
  }
  async listById(ids) {
    if (!ids || !ids.length) return
    let _sql = `SELECT id,name FROM tags WHERE id in (${ids})`
    return await query(_sql)
  }
  async list({ page = 1, per_page = 12, ...values }) {
    const { keyword = "" } = values
    let _sql =
      !keyword
        ? `SELECT id,created_time,name FROM tags LIMIT ${(page - 1) * per_page},${(page) * per_page};`
        : `SELECT id,created_time,name FROM tags WHERE name LIKE '%${keyword}%' LIMIT ${(page - 1) * per_page},${(page) * per_page};`
    let res = await query(_sql)
    return res
  }
  async update(values, id) {
    const { name } = values
    const val = { name }
    let _sql = `UPDATE tags SET ? WHERE id = ${id}`
    return await query(_sql, val)
  }
  async detail(id) {
    let _sql = `SELECT * FROM tags WHERE id = ${id} LIMIT 1`
    const res = await query(_sql)
    return res
  }
  async remove(id) {
    let _sql = `DELETE FROM res WHERE ?`
    return await query(_sql, { id })
  }
}

module.exports = new TagModels()
