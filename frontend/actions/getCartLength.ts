'use server'

import { apiURL } from '@/config/config'

export const getCartLength = async () => {
  try {
    const url = `${apiURL}/cart?length=true`

    const res = await fetch(url)
    const data = await res.json()

    if(data) {
      return data.length
    }
  } catch (error) {
    console.log('Error getting cart length')
    return undefined
  }
}