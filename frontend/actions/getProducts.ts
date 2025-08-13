'use server'

import { apiURL } from '@/config/config'
import { Product } from '@/types/types'
import { revalidatePath } from 'next/cache'

export async function getProducts() {
  try {
    const url = `${apiURL}/products`
    const res = await fetch(url)
    const data = await res.json()

    return data.products as Product[]

  } catch (error) {
    console.log('Error getting products')
    return undefined
  }
}