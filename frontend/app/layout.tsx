import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { CartProvider } from '@/context/CartContext'
import { Credits } from '@/components/Credits'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'API Test - Daniel Merchan',
  description: 'Prueba de E-commerce API Daniel Merchan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"
    >
      <body className={`${inter.className} flex flex-col w-full h-screen` }>
        <CartProvider>
          <Header />
          {children}
          <Credits />
        </CartProvider>
      </body>
    </html>
  )
}
