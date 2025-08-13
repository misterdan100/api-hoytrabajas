import { Product } from '@/types/types'
import { ProductPreview } from '../cart/ProductPreview'

export const ProductList = ({products}: {products: Product[]}) => {
  
  
  
  return (
    <div className="gap-2 grid bg-white shadow p-4 rounded-2xl h-fit">
      <p className='font-bold'>Lista de Productos: {products?.length}</p>
      { products && products.map( product => (
        <ProductPreview 
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}