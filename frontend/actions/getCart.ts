'use server'

import { apiLink } from '@/config/config'
import { Cart } from '@/types/types'

export const getCart = async () => {
  try {

    const url = `${apiLink}/cart`

    const res = await fetch(url)
    const data = await res.json()

    if(data) {
      return data.cart as Cart
    }
    
  } catch (error) {
    console.log('Error getting cart')
    return undefined
  }
}