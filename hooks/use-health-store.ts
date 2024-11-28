'use client'

import { useEffect, useState } from 'react'
import { HealthEntry } from '@/types/health'

let count = 0
const BLOCK_TIME_MS = 5 * 60 * 1000 // 5 minutes in milliseconds

function generateUniqueId() {
  count = (count + 1) % Number.MAX_VALUE
  return `${Date.now()}-${count}`
}

export function useHealthStore() {
  const [entries, setEntries] = useState<HealthEntry[]>([])
  const [currentValues, setCurrentValues] = useState<Partial<HealthEntry>>({})
  const [currentEntryStartTime, setCurrentEntryStartTime] = useState<Date | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('health-entries')
    if (stored) {
      setEntries(JSON.parse(stored))
    }
    
    const storedCurrent = localStorage.getItem('current-values')
    const storedTime = localStorage.getItem('current-entry-start-time')
    
    if (storedCurrent && storedTime) {
      const startTime = new Date(storedTime)
      const now = new Date()
      const timeDiff = now.getTime() - startTime.getTime()
      
      if (timeDiff < BLOCK_TIME_MS) {
        setCurrentValues(JSON.parse(storedCurrent))
        setCurrentEntryStartTime(startTime)
      } else {
        localStorage.removeItem('current-values')
        localStorage.removeItem('current-entry-start-time')
      }
    }
  }, [])

  useEffect(() => {
    if (currentEntryStartTime) {
      const timeoutId = setTimeout(() => {
        setCurrentValues({})
        setCurrentEntryStartTime(null)
        localStorage.removeItem('current-values')
        localStorage.removeItem('current-entry-start-time')
      }, BLOCK_TIME_MS)

      return () => clearTimeout(timeoutId)
    }
  }, [currentEntryStartTime])

  const addEntry = (entry: Partial<HealthEntry>) => {
    const now = new Date()
    
    if (!currentEntryStartTime || (now.getTime() - currentEntryStartTime.getTime() >= BLOCK_TIME_MS)) {
      setCurrentEntryStartTime(now)
      setCurrentValues(entry)
      localStorage.setItem('current-entry-start-time', now.toISOString())
      localStorage.setItem('current-values', JSON.stringify(entry))
    } else {
      const updatedValues = { ...currentValues, ...entry }
      setCurrentValues(updatedValues)
      localStorage.setItem('current-values', JSON.stringify(updatedValues))
    }

    const recentEntry = entries.find(e => {
      const entryDate = new Date(e.date)
      return entryDate >= (currentEntryStartTime || now) && 
             entryDate <= new Date((currentEntryStartTime || now).getTime() + BLOCK_TIME_MS)
    })

    if (recentEntry) {
      const updatedEntry = {
        ...recentEntry,
        ...entry
      } as HealthEntry
      
      const newEntries = entries.map(e => 
        e.id === recentEntry.id ? updatedEntry : e
      )
      setEntries(newEntries)
      localStorage.setItem('health-entries', JSON.stringify(newEntries))
      return updatedEntry
    } else {
      const newEntry = {
        id: generateUniqueId(),
        date: (currentEntryStartTime || now).toISOString(),
        weight: 0,
        mood: 0,
        energy: 0,
        bloodPressure: { systolic: 0, diastolic: 0 },
        bloodSugar: 0,
        exercise: 0,
        sleep: 0,
        brainFog: false,
        lightheadedness: false,
        nausea: false,
        lackOfAppetite: false,
        ...entry
      } as HealthEntry

      const newEntries = [newEntry, ...entries]
      setEntries(newEntries)
      localStorage.setItem('health-entries', JSON.stringify(newEntries))
      return newEntry
    }
  }

  return {
    entries,
    currentValues,
    addEntry
  }
}

