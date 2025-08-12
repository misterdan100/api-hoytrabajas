import { Product } from '@/types/types'
import { ProductItem } from './ProductItem'

export const ProductsGrid = ({products}: {products: Product[]}) => {
  
  
  
  return (
    <main className='flex flex-wrap gap-4 p-4'>
      {products?.map(product => <ProductItem product={product}/>)}
    </main>
  )
}