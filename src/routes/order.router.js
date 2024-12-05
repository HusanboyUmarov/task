const Router = require("express")
const { findAll, findOne, create, update, remove, ordersByProducts } = require("../controller/order.controller")


const router = Router()

router.get("/order", findAll)
router.get("/order/products", ordersByProducts)
router.get("/order/:id", findOne)
router.post("/order", create)
router.patch("/order/:id", update)
router.delete("/order/:id", remove)

module.exports = router