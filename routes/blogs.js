const Router = require('koa-router')
const jwt = require("koa-jwt")
const fs = require('fs')
const router = new Router({ prefix: '/api/blogs' })
const { blogList, blogAdd, blogUpdate, blogDetail, blogRemove } = require('../controllers/blogs')

const secret = fs.readFileSync(process.cwd() + '/secret/private.pem')

const auth = jwt({ secret })

router.all('/', (ctx) => {
  console.log('success')
  ctx.body = "var jsonp = 'hello world'"
})
router.get('/list', blogList)
router.get('/frontlist', blogList)
router.post('/add', auth, blogAdd)
router.put('/update/:id', auth, blogUpdate)
router.get('/detail/:id', blogDetail)
router.delete('/remove/:id', auth, blogRemove)

module.exports = router