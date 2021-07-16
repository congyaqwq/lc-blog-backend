const knex = require('../mysql')
const query = require('../mysql')

class UserModels {
  async login(values) {
    const { username, password: passwd } = values
    return knex('user').where({
      username,
      passwd
    })
  }
  async userInfo(id) {
    return knex('user').where({ id })
  }
}

module.exports = new UserModels()