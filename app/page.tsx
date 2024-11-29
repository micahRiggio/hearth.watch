'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useHealthStore } from '@/hooks/use-health-store'
import { HealthMetric } from '@/types/health'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function MetricStars({ value, onChange }: { value: HealthMetric; onChange: (value: HealthMetric) => void }) {
  return (
    <div className="flex justify-between">
      {[1, 2, 3, 4].map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating as HealthMetric)}
          className="p-2"
        >
          <Star
            className={`h-10 w-10 ${
              rating <= value ? 'fill-[#35566B] text-[#35566B]' : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function SymptomEmoji({ emoji, label, isActive, onClick }: { emoji: string; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col items-center p-2 h-auto transition-colors duration-200",
        isActive ? "bg-[#35566B] text-white hover:bg-[#35566B]/90" : "hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      <span className="text-3xl mb-1">{emoji}</span>
      <span className="text-xs text-center">{label}</span>
    </Button>
  )
}

export default function HomePage() {
  const { addEntry, currentValues } = useHealthStore()
  const { toast } = useToast()
  const [weight, setWeight] = useState('')
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [bloodSugar, setBloodSugar] = useState('')
  const [mood, setMood] = useState<HealthMetric>(0)
  const [energy, setEnergy] = useState<HealthMetric>(0)
  const [exercise, setExercise] = useState<HealthMetric>(0)
  const [sleep, setSleep] = useState<HealthMetric>(0)
  const [brainFog, setBrainFog] = useState(false)
  const [lightheadedness, setLightheadedness] = useState(false)
  const [nausea, setNausea] = useState(false)
  const [lackOfAppetite, setLackOfAppetite] = useState(false)

  // Update values from currentValues when they change
  useEffect(() => {
    if (currentValues.weight) setWeight(currentValues.weight.toString())
    if (currentValues.bloodPressure?.systolic) setSystolic(currentValues.bloodPressure.systolic.toString())
    if (currentValues.bloodPressure?.diastolic) setDiastolic(currentValues.bloodPressure.diastolic.toString())
    if (currentValues.bloodSugar) setBloodSugar(currentValues.bloodSugar.toString())
    if (currentValues.mood) setMood(currentValues.mood)
    if (currentValues.energy) setEnergy(currentValues.energy)
    if (currentValues.exercise) setExercise(currentValues.exercise)
    if (currentValues.sleep) setSleep(currentValues.sleep)
    if (currentValues.brainFog) setBrainFog(currentValues.brainFog)
    if (currentValues.lightheadedness) setLightheadedness(currentValues.lightheadedness)
    if (currentValues.nausea) setNausea(currentValues.nausea)
    if (currentValues.lackOfAppetite) setLackOfAppetite(currentValues.lackOfAppetite)
  }, [currentValues])

  const saveEntry = (field: string, value: string | number | boolean) => {
    type EntryValue = number | boolean | { systolic: number; diastolic: number }
    const entry: Partial<Record<string, EntryValue>> = {}
    
    // Only proceed if there's a valid value
    if (typeof value === 'string' && value.trim() === '') {
      return
    }

    const celebratoryMessages = [
      "Awesome! Data captured! 🎯",
      "Great job tracking this! 🌟",
      "Health hero moment! 💪",
      "Progress logged! 🚀",
      "Nailed it! ⭐",
      "Health journey updated! 🌈",
      "Fantastic tracking! 🎉",
      "Another step forward! 👣",
      "Crushing your goals! 💫",
      "Health data secured! 🔒",
      "Way to stay on track! 🎯",
      "Beautiful progress! 🌺",
      "Health warrior status! ⚔️",
      "Commitment showing! 💝",
      "Self-care champion! 👑",
      "Health data mastery! 📊",
      "Tracking superstar! ⭐",
      "Wellness win! 🏆",
      "Health habits growing! 🌱",
      "Progress in motion! 🔄"
    ]

    const randomMessage = celebratoryMessages[Math.floor(Math.random() * celebratoryMessages.length)]

    if (typeof value === 'string') {
      const numValue = parseFloat(value)
      if (isNaN(numValue)) return
      if (field === 'systolic' || field === 'diastolic') {
        const currentBP = currentValues.bloodPressure || { systolic: 0, diastolic: 0 }
        entry.bloodPressure = {
          ...currentBP,
          [field]: numValue
        }
      } else {
        entry[field] = numValue
      }
    } else {
      entry[field] = value as EntryValue
    }

    const savedEntry = addEntry(entry)
    
    if (savedEntry) {
      toast({
        description: randomMessage,
        className: "fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md animate-slide-down bg-gradient-to-r from-emerald-300/70 via-teal-300/70 to-emerald-400/70 text-black font-semibold rounded-lg shadow-lg text-center py-3 backdrop-blur-md",
        duration: 1000
      })
    }

    // Reset input field after successful save
    switch (field) {
      case 'weight':
        setWeight('')
        break
      case 'systolic':
        setSystolic('')
        break
      case 'diastolic':
        setDiastolic('')
        break
      case 'bloodSugar':
        setBloodSugar('')
        break
      case 'mood':
        setMood(0)
        break
      case 'energy':
        setEnergy(0)
        break
      case 'exercise':
        setExercise(0)
        break
      case 'sleep':
        setSleep(0)
        break
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="min-h-full flex flex-col p-4 pt-16 pb-4 gap-6">
        {/* Numeric Inputs Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="weight" className="text-base font-medium text-[#8F6566] mb-2 block">Weight (kg)</label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onBlur={() => saveEntry('weight', weight)}
              className="border-[#35566B] text-xl p-3"
            />
          </div>
          <div>
            <label htmlFor="bloodSugar" className="text-base font-medium text-[#8F6566] mb-2 block">Blood Sugar</label>
            <Input
              id="bloodSugar"
              type="number"
              step="0.1"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              onBlur={() => saveEntry('bloodSugar', bloodSugar)}
              className="border-[#35566B] text-xl p-3"
            />
          </div>
        </div>

        {/* Blood Pressure */}
        <div>
          <label className="text-base font-medium text-[#8F6566] mb-2 block">Blood Pressure</label>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Systolic"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              onBlur={() => saveEntry('systolic', systolic)}
              className="border-[#35566B] text-xl p-3"
            />
            <Input
              type="number"
              placeholder="Diastolic"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              onBlur={() => saveEntry('diastolic', diastolic)}
              className="border-[#35566B] text-xl p-3"
            />
          </div>
        </div>

        {/* Star Ratings Section */}
        <div className="space-y-5">
          <div>
            <label className="text-base font-medium text-[#8F6566] mb-2 block">Mood</label>
            <MetricStars value={mood} onChange={(value) => {
              setMood(value)
              saveEntry('mood', value)
            }} />
          </div>
          <div>
            <label className="text-base font-medium text-[#8F6566] mb-2 block">Energy</label>
            <MetricStars value={energy} onChange={(value) => {
              setEnergy(value)
              saveEntry('energy', value)
            }} />
          </div>
          <div>
            <label className="text-base font-medium text-[#8F6566] mb-2 block">Exercise</label>
            <MetricStars value={exercise} onChange={(value) => {
              setExercise(value)
              saveEntry('exercise', value)
            }} />
          </div>
          <div>
            <label className="text-base font-medium text-[#8F6566] mb-2 block">Sleep</label>
            <MetricStars value={sleep} onChange={(value) => {
              setSleep(value)
              saveEntry('sleep', value)
            }} />
          </div>
        </div>

        {/* Symptoms Section */}
        <div>
          <label className="text-base font-medium text-[#8F6566] mb-3 block">Symptoms</label>
          <div className="grid grid-cols-4 gap-3">
            <SymptomEmoji
              emoji="🧠"
              label="Brain Fog"
              isActive={brainFog}
              onClick={() => {
                setBrainFog(!brainFog);
                saveEntry('brainFog', !brainFog);
              }}
            />
            <SymptomEmoji
              emoji="💫"
              label="Dizzy"
              isActive={lightheadedness}
              onClick={() => {
                setLightheadedness(!lightheadedness);
                saveEntry('lightheadedness', !lightheadedness);
              }}
            />
            <SymptomEmoji
              emoji="🤢"
              label="Nausea"
              isActive={nausea}
              onClick={() => {
                setNausea(!nausea);
                saveEntry('nausea', !nausea);
              }}
            />
            <SymptomEmoji
              emoji="🍽️"
              label="No Appetite"
              isActive={lackOfAppetite}
              onClick={() => {
                setLackOfAppetite(!lackOfAppetite);
                saveEntry('lackOfAppetite', !lackOfAppetite);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

