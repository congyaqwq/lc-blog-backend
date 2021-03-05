const query = require('../mysql')
const { thumbList } = require('./thumbs')
const { listById } = require('./tags')

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
    const { keyword = "", user_id, tags } = values
    let _sql = `SELECT id,created_time,title,thumbs,views,tags,sort,SUBSTR(content,1,10) as content FROM blog ${keyword ? `WHERE title LIKE '%${keyword}%' OR content LIKE '%${keyword}%'` : ''} ${tags ? `${keyword ? 'AND' : 'WHERE'} FIND_IN_SET(${tags},tags)` : ''} LIMIT ${(page - 1) * per_page},${(page) * per_page};`
    let res = await query(_sql)
    let hasThumbList = await thumbList(user_id)
    hasThumbList = hasThumbList.map(it => it.blog_id)
    return await Promise.all(res.map(async it => {
      return {
        ...it,
        is_thumb: Number(hasThumbList.includes(it.id)),
        tags: it.tags ? await listById(it.tags) : ''
      }
    }))
  }
  async update(values, id) {
    const { title, content, tags } = values
    const val = { title, content, tags }
    let _sql = `UPDATE blog SET ? WHERE id = ${id}`
    return await query(_sql, val)
  }
  async detail(id, user_id) {
    let _sql = `SELECT * FROM blog WHERE id = ${id} LIMIT 1`
    const res = await query(_sql)
    let hasThumbList = await thumbList(user_id)
    hasThumbList = hasThumbList.map(it => it.blog_id)
    const data = res[0] || {}
    data.is_thumb = Number(hasThumbList.includes(id))
    data.tags = await listById(data.tags)
    return data
  }
  async remove(id) {
    let _sql = `DELETE FROM blog WHERE ?`
    return await query(_sql, { id })
  }
  async addViews(id) {
    const _sql = `UPDATE blog SET views=views+1 WHERE ?`
    return await query(_sql, { id })
  }
}

module.exports = new BlogModels()
