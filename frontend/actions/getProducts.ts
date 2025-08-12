'use server'

import { apiLink } from '@/config/config'
import { Product } from '@/types/types'

export async function getProducts() {
  try {
    const url = `${apiLink}/products`
    const res = await fetch(url)
    const data = await res.json()

    return data.products as Product[]
    
  } catch (error) {
    console.log('Error getting products')
    return undefined
  }
}