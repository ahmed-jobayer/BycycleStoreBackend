import express from "express"
import { OrderControllers } from "./order.controller"
import validateRequest from "../../middlewares/validateRequest"
import { OrderValidation } from "./order.validation"

const router = express.Router()

router.post('/create-order' , OrderControllers.createOrder)
router.get('/', OrderControllers.getAllOrder)
router.patch('/:id', OrderControllers.updateSingleOrder)
router.delete('/:id', OrderControllers.deleteSingleOrder)

router.post('/success/:transactionId',OrderControllers.successOrder)
router.post('/fail/:transactionId', OrderControllers.failOrder)

export const orderRoutes = router   