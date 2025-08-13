'use client'

import { getCartLength } from '@/actions/getCartLength'
import { pages } from '@/data/links'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export const Header = () => {

  const {quantity, setQuantity} = useCart()

  useEffect(() => {
    const updateQuantity = async() => {

      const cartProductsLength = await getCartLength()
      setQuantity(cartProductsLength)
    }
    updateQuantity()
  }, [])
  
  
  return (
    <div className='flex justify-between bg-slate-200 px-10 py-2 w-full'>
      <div className='flex gap-2'>
        {pages.map( page => (
          <Link 
            key={page.href}
            href={page.href}
            className='hover:bg-yellow-400 px-4 py-2 rounded-lg transition-colors'
          >{page.title}</Link>
        ))}
      </div>

      <Link
        href='/cart'
        className='flex justify-center items-center gap-1 bg-yellow-400 hover:bg-yellow-200 px-4 rounded-lg transition-colors'>
        <Image 
          src={'/cart-icon.svg'}
          height={25}
          width={25}
          alt='cart'
        />
        {quantity > 0 && <span className='font-bold'>{quantity}</span>}
        
      </Link>
      
    </div>
  )
}