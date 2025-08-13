'use client'

import { getCart } from '@/actions/getCart';
import { ProductPreview } from "@/components/cart/ProductPreview";
import { ProductList } from '@/components/products/ProductList';
import { Cart } from '@/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [ cart, setCart ] = useState<Cart | undefined>(undefined)

  // is necesary a useEffect to refresh the cart everytime user visit the cartPage
  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart()
      setCart(data)
      console.log(cart)
    }

    fetchCart()
  }, [])

  const totalProducts = cart?.products.length
  const totalPrice = cart?.products.reduce( (total, product) => (total + product.price), 0)

  return (
    <div className="gap-6 grid grid-cols-3 bg-gray-100 p-6 w-full h-full overflow-y-auto">

        {/* LEFT side => products preview */}
        { cart?.products.length ? (
          <div className='col-span-2'>
            <ProductList products={cart.products}/>
          </div>
        ) : (
          <div className="flex flex-col gap-2 col-span-2 bg-white shadow p-4 rounded-2xl h-fit">
            <p className='text-gray-500 text-center'>El carrito esta vacio.</p>
            <Link 
              href='/'
              className='font-bold text-gray-500 hover:text-black text-center'
            >Ver Productos</Link>
          </div>
        )}

        {/* RIGHT side => cart resume */}
        <div className="flex flex-col gap-2 col-span-1 bg-white shadow p-4 rounded-2xl h-fit">
          <h2 className='font-bold text-lg'>Carrito de Compras:</h2>
          <div>
            <p className='text-gray-500'>Cantidad de productos:</p>
            <p className='font-bold'>{totalProducts} {totalProducts === 1 ? ' Producto' : ' Productos'}</p>
          </div>

          <div>
            <p className='text-gray-500'>Valor total:</p>
            <p className='font-bold'>$ {totalPrice}</p>
          </div>

          <button
            className="bg-yellow-300 hover:bg-gray-200 mt-2 py-1 border border-yellow-400 hover:border-gray-300 rounded-lg w-full font-bold text-center uppercase transition-colors"
          >Pagar</button>
        </div>
    </div>
  );
}
