'use server'

import { apiURL } from '@/config/config'
import { revalidatePath } from 'next/cache'

export const addProductToCart = async (productId: number) => {
  try {
    const url = `${apiURL}/cart`
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ productId })
    })
    const data = await res.json()

    if( data.ok ) {
      return true
    }
    
  } catch (error) {
    console.log('[ERROR_ADDPRODUCTTOCART]', error)
    return undefined
  }
}