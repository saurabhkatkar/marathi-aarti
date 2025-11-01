import type { Metadata } from 'next'
import { Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-devanagari',
})

export const metadata: Metadata = {
  title: 'मराठी आरती संग्रह | Marathi Aarti Collection',
  description: 'A beautiful collection of traditional Marathi devotional aartis with modern UI/UX design',
  keywords: ['marathi', 'aarti', 'devotional', 'hindu', 'prayers', 'मराठी', 'आरती'],
  authors: [{ name: 'Marathi Aarti Collection' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#667eea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mr" className={notoSansDevanagari.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${notoSansDevanagari.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}