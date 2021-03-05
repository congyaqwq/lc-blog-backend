
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
  ctx.body = {
    msg: '执行成功'
  }
}