import { getProducts } from '@/actions/getProducts';
import { ProductsGrid } from '@/components/products/ProductsGrid';
import { Product } from '@/types/types';
import { useEffect } from 'react';

export default async function Home() {

  const products = await getProducts()
    
  return (
    <div className='bg-gray-100 w-full h-full overflow-y-auto'>
      {products ? (
        <ProductsGrid 
          products={products}
        />

      ) : (
        <p>No hay productos para mostrar.</p>
      )}
    </div>
  )
}
