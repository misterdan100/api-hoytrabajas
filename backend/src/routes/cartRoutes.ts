import {Router} from 'express'
import { addProductToCart, cleanCart, getCart } from '../controllers/cartController'

const router = Router()

router.get('/', getCart)
router.post('/', addProductToCart)
router.delete('/', cleanCart)

export default router