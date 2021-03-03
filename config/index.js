const HOST = process.env.NODE_ENV === 'production' ? '172.22.22.31' : '127.0.0.1'
const PORT = process.env.NODE_ENV === 'production' ? '3307' : '3306'
console.log(process.env.NODE_ENV)
console.log(HOST, PORT)
const config = {
  port: 3000,
  database: {
    DATABASE: 'lc_blog',
    USERNAME: 'root',
    PASSWORD: 'mysql',
    PORT,
    HOST
  }
}

module.exports = config