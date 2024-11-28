'use client'

import { format } from 'date-fns'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useHealthStore } from '@/hooks/use-health-store'
import { HealthMetric } from '@/types/health'

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

export default function HistoryPage() {
  const { entries } = useHealthStore()

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-[#8F6566]">Health History</h1>
      {entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry) => (
        <Card key={entry.id} className="border-[#35566B]">
          <CardHeader>
            <CardTitle className="text-lg text-[#35566B]">
              {format(new Date(entry.date), 'PPP p')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {entry.weight && (
                <>
                  <div className="text-[#8F6566]">Weight:</div>
                  <div>{entry.weight} kg</div>
                </>
              )}
              
              {entry.bloodPressure && (entry.bloodPressure.systolic || entry.bloodPressure.diastolic) && (
                <>
                  <div className="text-[#8F6566]">Blood Pressure:</div>
                  <div>{entry.bloodPressure.systolic || '-'}/{entry.bloodPressure.diastolic || '-'}</div>
                </>
              )}
              
              {entry.bloodSugar && (
                <>
                  <div className="text-[#8F6566]">Blood Sugar:</div>
                  <div>{entry.bloodSugar}</div>
                </>
              )}
              
              {entry.mood !== undefined && (
                <>
                  <div className="text-[#8F6566]">Mood:</div>
                  <MetricStars value={entry.mood} />
                </>
              )}
              
              {entry.energy !== undefined && (
                <>
                  <div className="text-[#8F6566]">Energy:</div>
                  <MetricStars value={entry.energy} />
                </>
              )}
              
              {entry.exercise !== undefined && (
                <>
                  <div className="text-[#8F6566]">Exercise:</div>
                  <MetricStars value={entry.exercise} />
                </>
              )}
              
              {entry.sleep !== undefined && (
                <>
                  <div className="text-[#8F6566]">Sleep:</div>
                  <MetricStars value={entry.sleep} />
                </>
              )}
            </div>
            <div className="mt-4">
              <div className="text-[#8F6566] mb-2">Symptoms:</div>
              <div className="grid grid-cols-2 gap-2">
                {entry.brainFog && <SymptomEmoji emoji="🧠" label="Brain Fog" isActive={true} />}
                {entry.lightheadedness && <SymptomEmoji emoji="💫" label="Lightheadedness" isActive={true} />}
                {entry.nausea && <SymptomEmoji emoji="🤢" label="Nausea" isActive={true} />}
                {entry.lackOfAppetite && <SymptomEmoji emoji="🍽️" label="Lack of Appetite" isActive={true} />}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

