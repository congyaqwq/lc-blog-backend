const query = require('../mysql')

class UserModels {
  async login(values) {
    const { username, password: passwd } = values
    const _sql = `SELECT * FROM user WHERE username = ? AND passwd = ?`
    return await query(_sql, [username, passwd])
  }
}

module.exports = new UserModels()