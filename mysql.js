const mysql = require('mysql')
const config = require('./config')

let pool = mysql.createPool({
  host: config.database.HOST,
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

module.exports = query

