import { Inter } from 'next/font/google'
import { History, Plus, User } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toast"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background min-h-screen dark:bg-gray-900 dark:text-white")}>
        <main className="container max-w-md mx-auto pb-16">
          {children}
        </main>
        <nav className="fixed bottom-0 left-0 right-0 border-t border-[#35566B] bg-background dark:bg-gray-800">
          <div className="container max-w-md mx-auto">
            <div className="flex justify-between items-center p-2">
              <Link 
                href="/"
                className="flex flex-col items-center p-2 text-[#8F6566] hover:text-[#35566B]"
              >
                <History className="h-6 w-6" />
                <span className="text-xs">History</span>
              </Link>
              <Link 
                href="/add"
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

