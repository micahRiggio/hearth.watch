'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Health Tracker</CardTitle>
          <CardDescription>
            A simple app to track your daily health metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This app stores all your data locally on your device. No data is sent to any server.
            Make sure to backup your data regularly by taking screenshots or writing down important information.
          </p>
          <div className="flex items-center space-x-2">
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={toggleDarkMode} />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

