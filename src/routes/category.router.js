
const Router = require("express")
const router = Router()
const {
    findOneCategory, 
    createCategory, 
    findCategory, 
    updateCategory, 
    deleteCategory,
    aggregateByProducts
} = require("../controller/category.controller")


router.get('/category',findCategory)
router.get("/category/products", aggregateByProducts)
router.get('/category/:id',findOneCategory)
router.post('/category', createCategory)
router.patch('/category/:id', updateCategory)
router.delete('/category/:id',deleteCategory)



module.exports = router;