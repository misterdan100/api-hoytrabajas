import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

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
        <Header />
        {children}
      </body>
    </html>
  )
}
