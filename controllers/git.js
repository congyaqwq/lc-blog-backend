
var exec = require('child_process').exec
function execute(cmd) {

  exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.error(error)
    }
    else {
      console.log("success")
    }
  })

}

module.exports = async (ctx) => {
  execute('git pull origin main')
  execute('docker-compose restart')
  ctx.body = {
    code: 200,
    msg: '执行成功'
  }
}