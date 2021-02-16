const Router = require('koa-router')
const jwt = require("koa-jwt")
const fs = require('fs')
const router = new Router()
const { thumbBlog } = require('../controllers/thumb')

const secret = fs.readFileSync(process.cwd() + '/secret/private.pem')
const auth = jwt({ secret })

router.put('/thumb', thumbBlog)

module.exports = router