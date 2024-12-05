const Router = require('express');

const router = Router();
const {create, findAll, findOne,remove, update} = require('../controller/product.controller')

router.get('/product',findAll)
router.get('/product/:id',findOne)
router.post('/product',create)
router.patch('/product/:id',update)
router.delete('/product/:id',remove)


module.exports = router
