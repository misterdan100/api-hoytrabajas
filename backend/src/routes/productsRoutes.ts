// this router handle diferent types of requests only for products
import { Router } from 'express'
import { getProducts } from '../controllers/produtsController'

// import express router to link with server
const router = Router()

// call function to get products
router.get('/', getProducts)

export default router;

