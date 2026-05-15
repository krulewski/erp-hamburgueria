import { Router } from 'express'
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController'

const router = Router()

router.post('/', createOrder)
router.get('/', getOrders)
router.put('/:id', updateOrderStatus)
router.delete('/:id', deleteOrder) 

export default router