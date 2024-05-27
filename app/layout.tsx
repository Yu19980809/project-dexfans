import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from '@/components/dark-mode/theme-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "DexFans",
  description: "Social media and online fans community.",
  icons: { icon: './logo.png' }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <Toaster />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
