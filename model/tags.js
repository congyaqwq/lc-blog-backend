const knex = require('../mysql')

class TagModels {
  async total(values) {
    const { keyword = "" } = values
    return knex('tags').count({ 'count': '*' }).where('name', 'like', `%${keyword}%`)
  }
  async add(values) {
    return knex('tags').insert([{
      id: values.id,
      name: values.name
    }])
  }
  async listById(ids) {
    if (!ids || !ids.length) return
    return knex.select('id', 'name').from('tags').whereIn('id', ids.split(','))
  }
  async list({ page = 1, per_page = 12, ...values }) {
    const { keyword = "" } = values
    const mysql = knex.select('id', "created_time", "name")
      .from('tags')
      .limit(per_page).offset((page - 1) * per_page)
    if (keyword) {
      mysql.where('name', 'like', `%${keyword}%`)
    }
    return mysql
  }
  async update(values, id) {
    const { name } = values
    const val = { name }
    return knex('tags').where({ id }).update({
      id: val.id,
      name: val.name
    })
  }
  async detail(id) {
    const res = await knex('tags').where({ id }).limit(1)
    return res[0] || {}
  }
  async remove(id) {
    return knex('tags').where({ id }).del()
  }
}

module.exports = new TagModels()
