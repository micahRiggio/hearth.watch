'use client'

import { useEffect, useState } from 'react'
import { HealthEntry } from '@/types/health'

let count = 0

function generateUniqueId() {
  count = (count + 1) % Number.MAX_VALUE
  return `${Date.now()}-${count}`
}

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
      ...entries[0], // Get the latest entry as a base
      ...entry, // Override with new data
      id: generateUniqueId(), // Ensure these are always set
      date: new Date().toISOString(), // and not overwritten
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

