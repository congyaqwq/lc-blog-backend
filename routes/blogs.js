const Router = require('koa-router')
const router = new Router({ prefix: '/blogs' })
const { blogList, blogAdd, blogUpdate, blogDetail } = require('../controllers/blogs')


router.all('/', () => {
  console.log('success')
})
router.get('/list', blogList)
router.post('/add', blogAdd)
router.get('/detail/:id', blogDetail)

module.exports = router