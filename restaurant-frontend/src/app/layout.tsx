import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideNavbar from '@/components/Navbars/SideNavbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <SideNavbar/>
        <main className='bg-gray-50 '>
          {children}
        </main>
      </body>
    </html>
  )
}
