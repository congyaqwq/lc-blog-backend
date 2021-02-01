const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { userLogin } = require('../controllers/user')

router.post('/login', userLogin)
module.exports = router