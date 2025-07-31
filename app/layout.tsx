import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio - ChrifferJohn',
  description: 'Personal portfolio showcasing my skills, projects, and experience in web development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={inter.className}>
        <Loader />
        {children}
        <Footer />
      </body>
    </html>
  )
} 