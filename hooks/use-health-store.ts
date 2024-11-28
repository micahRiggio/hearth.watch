'use client'

import { useEffect, useState } from 'react'
import { HealthEntry } from '@/types/health'

export function useHealthStore() {
  const [entries, setEntries] = useState<HealthEntry[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('health-entries')
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  const addEntry = (entry: Partial<HealthEntry>) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...entries[0], // Get the latest entry as a base
      ...entry // Override with new data
    }
    const newEntries = [newEntry, ...entries]
    setEntries(newEntries)
    localStorage.setItem('health-entries', JSON.stringify(newEntries))
    return newEntry
  }

  return {
    entries,
    addEntry
  }
}

