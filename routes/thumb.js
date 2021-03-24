const Router = require('koa-router')
const jwt = require("koa-jwt")
const fs = require('fs')
const router = new Router({ prefix: '/api/thumbs' })
const { thumbBlog, cancelThumb } = require('../controllers/thumb')

const secret = fs.readFileSync(process.cwd() + '/secret/private.pem')
const auth = jwt({ secret })

router.put('/add', thumbBlog)
router.put('/cancel', cancelThumb)

module.exports = router