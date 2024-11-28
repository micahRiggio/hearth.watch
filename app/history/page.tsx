'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useHealthStore } from '@/hooks/use-health-store'
import { HealthMetric } from '@/types/health'
import { useEffect, useState } from 'react'

function MetricStars({ value }: { value: HealthMetric }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4].map((rating) => (
        <Star
          key={rating}
          className={`h-4 w-4 ${
            rating <= value ? 'fill-[#35566B] text-[#35566B]' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  )
}

function SymptomEmoji({ emoji, label, isActive }: { emoji: string; label: string; isActive: boolean }) {
  return (
    <div className={`flex items-center space-x-2 ${isActive ? 'text-[#35566B]' : 'text-muted-foreground'}`}>
      <span>{emoji}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}

function MetricRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <>
      <div className="text-[#8F6566]">{label}:</div>
      <div>{value}</div>
    </>
  )
}

export default function HistoryPage() {
  const { entries } = useHealthStore()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-[#8F6566]">Health History</h1>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-[#8F6566]">Health History</h1>
      {sortedEntries.map((entry) => {
        // Collect only the metrics that have values
        const hasMetrics = []
        
        if (entry.weight) {
          hasMetrics.push(
            <MetricRow key="weight" label="Weight" value={`${entry.weight} kg`} />
          )
        }
        
        if (entry.bloodPressure?.systolic || entry.bloodPressure?.diastolic) {
          hasMetrics.push(
            <MetricRow 
              key="bp" 
              label="Blood Pressure" 
              value={`${entry.bloodPressure.systolic || '-'}/${entry.bloodPressure.diastolic || '-'}`} 
            />
          )
        }
        
        if (entry.bloodSugar) {
          hasMetrics.push(
            <MetricRow key="bloodSugar" label="Blood Sugar" value={entry.bloodSugar} />
          )
        }
        
        if (entry.mood) {
          hasMetrics.push(
            <MetricRow key="mood" label="Mood" value={<MetricStars value={entry.mood} />} />
          )
        }
        
        if (entry.energy) {
          hasMetrics.push(
            <MetricRow key="energy" label="Energy" value={<MetricStars value={entry.energy} />} />
          )
        }
        
        if (entry.exercise) {
          hasMetrics.push(
            <MetricRow key="exercise" label="Exercise" value={<MetricStars value={entry.exercise} />} />
          )
        }
        
        if (entry.sleep) {
          hasMetrics.push(
            <MetricRow key="sleep" label="Sleep" value={<MetricStars value={entry.sleep} />} />
          )
        }

        const hasSymptoms = entry.brainFog || entry.lightheadedness || entry.nausea || entry.lackOfAppetite

        // Only render card if there are metrics or symptoms
        if (hasMetrics.length === 0 && !hasSymptoms) return null

        return (
          <Card key={entry.id} className="border-[#35566B]">
            <CardHeader>
              <CardTitle className="text-lg text-[#35566B]">
                {format(new Date(entry.date), 'PPP p', { locale: enUS })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasMetrics.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {hasMetrics}
                </div>
              )}

              {hasSymptoms && (
                <div>
                  <div className="text-[#8F6566] mb-2">Symptoms:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {entry.brainFog && <SymptomEmoji emoji="🧠" label="Brain Fog" isActive={true} />}
                    {entry.lightheadedness && <SymptomEmoji emoji="💫" label="Lightheadedness" isActive={true} />}
                    {entry.nausea && <SymptomEmoji emoji="🤢" label="Nausea" isActive={true} />}
                    {entry.lackOfAppetite && <SymptomEmoji emoji="🍽️" label="Lack of Appetite" isActive={true} />}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

