'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MetricRating } from '@/components/metric-rating'
import { useHealthStore } from '@/hooks/use-health-store'
import { HealthMetric } from '@/types/health'

export default function AddEntryPage() {
  const router = useRouter()
  const { addEntry } = useHealthStore()
  const [weight, setWeight] = useState('')
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [bloodSugar, setBloodSugar] = useState('')
  const [mood, setMood] = useState<HealthMetric>(0)
  const [energy, setEnergy] = useState<HealthMetric>(0)
  const [exercise, setExercise] = useState<HealthMetric>(0)
  const [sleep, setSleep] = useState<HealthMetric>(0)

  useEffect(() => {
    const saveEntry = () => {
      if (weight && systolic && diastolic && bloodSugar) {
        addEntry({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          weight: parseFloat(weight),
          bloodPressure: {
            systolic: parseInt(systolic),
            diastolic: parseInt(diastolic)
          },
          bloodSugar: parseFloat(bloodSugar),
          mood,
          energy,
          exercise,
          sleep
        })
        router.push('/')
      }
    }

    saveEntry()
  }, [weight, systolic, diastolic, bloodSugar, mood, energy, exercise, sleep, addEntry, router])

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Health Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Weight (kg)
            </label>
            <Input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Systolic BP
              </label>
              <Input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Diastolic BP
              </label>
              <Input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Blood Sugar
            </label>
            <Input
              type="number"
              step="0.1"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              required
            />
          </div>

          <MetricRating
            label="Mood"
            value={mood}
            onChange={setMood}
          />

          <MetricRating
            label="Energy Level"
            value={energy}
            onChange={setEnergy}
          />

          <MetricRating
            label="Exercise Level"
            value={exercise}
            onChange={setExercise}
          />

          <MetricRating
            label="Sleep Quality"
            value={sleep}
            onChange={setSleep}
          />
        </CardContent>
      </Card>
    </div>
  )
}

