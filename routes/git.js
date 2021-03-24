const Router = require('koa-router')
const router = new Router({ prefix: '/api/git' })
const gitpull = require('../controllers/git')

router.post('/pull', gitpull)

module.exports = router
