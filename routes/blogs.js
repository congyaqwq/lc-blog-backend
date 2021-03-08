const Router = require('koa-router')
const jwt = require("koa-jwt")
const fs = require('fs')
const router = new Router({ prefix: '/blogs' })
const { blogList, frontBlogList, blogAdd, blogUpdate, blogDetail, blogRemove } = require('../controllers/blogs')

const secret = fs.readFileSync(process.cwd() + '/secret/private.pem')

const auth = jwt({ secret })

router.all('/', () => {
  console.log('success')
})
router.get('/list', blogList)
router.get('/frontlist', blogList)
router.post('/add', auth, blogAdd)
router.put('/update/:id', auth, blogUpdate)
router.get('/detail/:id', blogDetail)
router.delete('/remove/:id', auth, blogRemove)

module.exports = router