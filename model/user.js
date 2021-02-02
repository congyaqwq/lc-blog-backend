const query = require('../mysql')

class UserModels {
  async login(values) {
    const { username, password: passwd } = values
    const _sql = `SELECT * FROM user WHERE username = ? AND passwd = ?`
    return await query(_sql, [username, passwd])
  }
  async userInfo(values) {
    const _sql = `SELECT * FROM user WHERE ?`
    return await query(_sql, values)
  }
}

module.exports = new UserModels()