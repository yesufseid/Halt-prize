import type { Metadata } from 'next'
import { Geist, Geist_Mono,Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '@/components/Header'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Team Up',
  
}
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose weights you need
  variable: '--font-poppins', // optional, for CSS variable usage
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ivcoin.ico" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
