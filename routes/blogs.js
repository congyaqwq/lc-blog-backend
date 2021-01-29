const Router = require('koa-router')
const router = new Router({ prefix: '/blogs' })
const { blogList, blogAdd, blogUpdate, blogDetail, blogRemove } = require('../controllers/blogs')


router.all('/', () => {
  console.log('success')
})
router.get('/list', blogList)
router.post('/add', blogAdd)
router.put('/update/:id', blogUpdate)
router.get('/detail/:id', blogDetail)
router.delete('/remove/:id', blogRemove)

module.exports = router