import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { History, Plus, User } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hearth Watch',
  description: 'Track your health metrics and symptoms',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Hearth Watch',
    startupImage: [
      {
        url: '/apple-touch-icon.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      }
    ]
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  }
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={cn(inter.className, "bg-background min-h-screen dark:bg-gray-900 dark:text-white")}>
        <main className="container max-w-md mx-auto pb-16">
          {children}
        </main>
        <nav className="fixed bottom-0 left-0 right-0 border-t border-[#35566B] bg-background dark:bg-gray-800">
          <div className="container max-w-md mx-auto">
            <div className="flex justify-between items-center p-2">
              <Link 
                href="/history"
                className="flex flex-col items-center p-2 text-[#8F6566] hover:text-[#35566B]"
              >
                <History className="h-6 w-6" />
                <span className="text-xs">History</span>
              </Link>
              <Link 
                href="/"
                className="flex flex-col items-center p-2 text-[#35566B] hover:text-[#35566B]"
              >
                <div className="rounded-full bg-[#35566B] text-white p-4 -mt-8">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="text-xs mt-1">Add Entry</span>
              </Link>
              <Link 
                href="/profile"
                className="flex flex-col items-center p-2 text-[#8F6566] hover:text-[#35566B]"
              >
                <User className="h-6 w-6" />
                <span className="text-xs">Profile</span>
              </Link>
            </div>
          </div>
        </nav>
        <Toaster />
      </body>
    </html>
  )
}

