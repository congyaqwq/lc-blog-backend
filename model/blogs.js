const query = require('../mysql')
const { thumbList } = require('./thumbs')
const { getIp } = require('../middleware/ip')

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
  async list({ page = 1, per_page = 12, ...values }, request) {
    const { keyword = "" } = values
    let _sql =
      !keyword
        ? `SELECT * FROM blog LIMIT ${(page - 1) * per_page},${(page) * per_page};`
        : `SELECT * FROM blog WHERE title LIKE '%${keyword}%' OR content LIKE '%${keyword}%' LIMIT ${(page - 1) * per_page},${(page) * per_page};`
    let res = await query(_sql)
    const user_ip = getIp(request)
    const ipList = await thumbList(user_ip)
    res.forEach(it => {
      it.is_thumb = Number(ipList.includes(it.id))
    })
    return res
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
