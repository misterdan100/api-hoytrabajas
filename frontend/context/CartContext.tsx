'use client'

import { createContext, useState, Dispatch, SetStateAction } from 'react';

type CartContextType = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

const initialValue = {
  quantity: 0,
  setQuantity: () => {},
}

export const CartContext = createContext<CartContextType>(initialValue);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [quantity, setQuantity] = useState(0)

  return (
    <CartContext.Provider 
      value={{
        quantity,
        setQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}