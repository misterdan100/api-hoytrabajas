import { CartContext } from '@/context/CartContext'
import { useContext } from 'react'

export const useCart = () => {
  const context = useContext(CartContext)
  
  // todo: handle error
  return context;
}