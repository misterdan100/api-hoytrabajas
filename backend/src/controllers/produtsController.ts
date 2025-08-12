import type { Request, Response} from 'express'
import productsJSON from '../data/productos.json'

export const getProducts = (req: Request, res: Response) => {

  res.status(200).json({products: productsJSON})
}