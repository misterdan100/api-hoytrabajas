import { pages } from '@/data/links'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  
  
  return (
    <div className='flex justify-between bg-slate-200 px-10 py-2 w-full'>
      <div className='flex gap-2'>
        {pages.map( page => (
          <Link 
            href={page.href}
            className='hover:bg-yellow-400 px-4 py-2 rounded-lg transition-colors'
          >{page.title}</Link>
        ))}
      </div>

      <Link
        href='/cart'
        className='flex justify-center items-center gap-1 bg-yellow-100 hover:bg-yellow-200 px-4 rounded-lg transition-colors'>
        <Image 
          src={'/cart-icon.svg'}
          height={25}
          width={25}
          alt='cart'
        />
        <span className='font-bold'>3</span>
      </Link>
      
    </div>
  )
}