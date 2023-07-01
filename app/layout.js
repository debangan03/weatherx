import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WEATHERx',
  description: 'Weather forecasting app with next js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={inter.className}>{children}</body>
    </html>
  )
}
