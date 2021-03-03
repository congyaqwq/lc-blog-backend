const Router = require('koa-router')
const jwt = require("koa-jwt")
const fs = require('fs')
const router = new Router({ prefix: '/tags' })
const { tagsList, tagsAdd, tagsUpdate, tagsDetail, tagsRemove } = require('../controllers/tags')

const secret = fs.readFileSync(process.cwd() + '/secret/private.pem')

const auth = jwt({ secret })

router.get('/list', tagsList)
router.post('/add', auth, tagsAdd)
router.put('/update/:id', auth, tagsUpdate)
router.get('/detail/:id', tagsDetail)
router.delete('/remove/:id', auth, tagsRemove)

module.exports = router