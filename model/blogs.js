const { thumbList } = require('./thumbs')
const { listById } = require('./tags')
const knex = require('../mysql')

class BlogModels {
  async total(values) {
    const { keyword = "" } = values
    return knex('blog').count({ 'count': '*' }).where('title', 'like', `%${keyword}%`).orWhere('content', 'like', `%${keyword}%`)
  }
  async add(values) {
    return knex('blog').insert([{
      ...values
    }])
  }
  async list({ page = 1, per_page = 12, ...values }) {
    const { keyword = "", tags = '' } = values
    let res = knex.select('id', "created_time", "title", "thumbs", "views", "tags", "sort", "status", "content")
      .from('blog')
      .limit(per_page).offset((page - 1) * per_page)

    if (keyword) {
      res.where('title', 'like', `%${keyword}%`).orWhere('content', 'like', `%${keyword}%`)
    }
    if (tags) {
      res.whereRaw(`FIND_IN_SET(${tags},tags)`)
    }
    res = await res
    return await Promise.all(res.map(async it => {
      return {
        ...it,
        tags: it.tags ? await listById(it.tags) : '',
        content: it.content.substr(0, 100)
      }
    }))
  }
  async orderList({ page = 1, per_page = 12, ...values }) {
    const { keyword = "", user_id, tags = '' } = values
    let mysql = knex.select('id', "created_time", "title", "thumbs", "views", "tags", "sort", "status", "content")
      .from('blog')
      .andWhere('status', '=', '1')
      .limit(per_page).offset((page - 1) * per_page)
    if (keyword) {
      mysql.where('title', 'like', `%${keyword}%`).orWhere('content', 'like', `%${keyword}%`)
    }
    if (tags) {
      mysql.whereRaw(`FIND_IN_SET(${tags},tags)`)
    }
    let res = await mysql
    let hasThumbList = []
    if (user_id) {
      hasThumbList = await thumbList(user_id)
    }
    hasThumbList = hasThumbList.map(it => it.blog_id)
    return await Promise.all(res.map(async it => {
      return {
        ...it,
        is_thumb: Number(hasThumbList.includes(it.id)),
        tags: it.tags ? await listById(it.tags) : '',
        content: it.content.substr(0, 100)
      }
    }))
  }
  async update(values, id) {
    const { title, content, tags, status } = values
    let val = { title, content, tags, status: Number(status) }
    const newVal = {}
    Object.keys(val).map(it => {
      if (val[it] || val[it] === 0) {
        newVal[it] = val[it]
      }
    })
    return knex('blog').where({ id }).update({
      ...newVal
    })
  }
  async detail(id, user_id) {
    const res = await knex('blog').where({ id }).limit(1)
    let hasThumbList = []
    if (user_id) {
      hasThumbList = await thumbList(user_id)
    }
    hasThumbList = hasThumbList.map(it => it.blog_id)
    const data = res[0] || {}
    data.is_thumb = Number(hasThumbList.includes(id))
    data.tags = await listById(data.tags)
    return data
  }
  async remove(id) {
    return knex('blog').where({ id }).del()
  }
  async addViews(id) {
    return knex('blog').where({ id }).increment('views', 1)
  }
}

module.exports = new BlogModels()
