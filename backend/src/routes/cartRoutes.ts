import {Router} from 'express'
import { addProductToCart, getCart } from '../controllers/cartController'

const router = Router()

router.get('/', getCart)
router.post('/', addProductToCart)

export default router