const mysql = require('mysql')
const config = require('./config')

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.database.HOST,
    port: config.database.PORT,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
  },
  debug: true,
  pool: { min: 0, max: 7 },
  log: {
    debug(message) {
      console.log(message.sql)
    },
  }
})

module.exports = knex




let pool = mysql.createPool({
  host: config.database.HOST,
  port: config.database.PORT,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        const q = connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
          connection.release()
        })
        // 打印执行的语句
        console.log(q.sql)
      }
    })
  })
}

// module.exports = query

