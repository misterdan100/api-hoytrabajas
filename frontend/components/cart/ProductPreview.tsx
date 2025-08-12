import { Product } from '@/types/types'

export const ProductPreview = ({product}: {product: Product}) => {
  const { id, name, price } = product
  
  
  return (
    <div className='flex justify-between bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl w-full'>
      <p className='font-bold'>{name}</p>
      <p>$ {price}</p>
    </div>
  )
}