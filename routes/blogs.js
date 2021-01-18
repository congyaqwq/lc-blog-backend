const Router = require('koa-router')
const router = new Router({ prefix: '/blogs' })
const { blogList, blogAdd, blogUpdate } = require('../controllers/blogs')


router.all('/', () => {
  console.log('success')
})
router.get('/list', blogList)
router.get('/add', blogAdd)

module.exports = router