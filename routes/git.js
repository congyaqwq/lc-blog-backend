// 每一次push都会触发的git webhooks
const Router = require('koa-router')
const router = new Router({ prefix: '/api/git' })
const gitpull = require('../controllers/git')

router.post('/pull', gitpull)

module.exports = router
