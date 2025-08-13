'use server'

import { apiURL } from '@/config/config'
import { revalidatePath } from 'next/cache'

export const cleanCart = async () => {
  try {
    const url = `${apiURL}/cart`

    const res = await fetch(url, {
      method: 'DELETE',
      cache: 'no-store'
    })

    if(!res.ok) {
      throw new Error('Failed to clean cart from API')
    }

    revalidatePath('/cart')

    return { success: true }
  } catch (error) {
    console.log('Error cleaning cart:', error)
    return undefined
  }
}