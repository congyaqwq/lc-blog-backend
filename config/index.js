const HOST = process.env.NODE_ENV === 'production' ? '172.22.22.31' : '127.0.0.1'
const PASSWORD = process.env.NODE_ENV === 'production' ? 'Lc0805abcdef' : 'mysql'
const config = {
  port: 3000,
  database: {
    DATABASE: 'lc_blog',
    USERNAME: 'root',
    PASSWORD,
    PORT: '3306',
    HOST
  }
}

module.exports = config