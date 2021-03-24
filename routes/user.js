const Router = require('koa-router')
const router = new Router({ prefix: '/api/users' })
const fs = require('fs')
const jwt = require("koa-jwt")
const { userLogin, userDetail } = require('../controllers/user')

const secret = fs.readFileSync(process.cwd() + '/secret/private.pem')

const auth = jwt({ secret })

router.post('/login', userLogin)
router.get('/detail', userDetail)
module.exports = router